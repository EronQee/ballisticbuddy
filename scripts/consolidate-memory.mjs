#!/usr/bin/env node

/**
 * consolidate-memory.mjs
 *
 * 从 documention/progress/*.md 扫描近期条目，按关键词规则匹配三层记忆的
 * 目标文件，输出「建议提炼」清单。**只做 dry-run 建议，永不写文件**——
 * curation 是人工/agent 的编辑动作，自动写入会把原始日志灌进记忆文件，
 * 污染记忆质量。
 *
 * 用法：
 *   node scripts/consolidate-memory.mjs             # 默认看最近 7 天
 *   node scripts/consolidate-memory.mjs --days 3    # 只看最近 N 天
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const PROGRESS_DIR = join(process.cwd(), 'documention', 'progress');

// 关键词规则：pattern → 三层记忆目标文件（相对 documention/harness/）
const RULES = [
  { pattern: /payload|migrate|migration|draft|publish|collection|localized/i, target: 'semantic/payload.md', label: 'Payload' },
  { pattern: /next\.?js|\.next|EADDRINUSE|端口|缓存|cache|opacity|白屏|sitemap.*构建/i, target: 'semantic/frontend.md', label: '前端/构建' },
  { pattern: /i18n|next-intl|locale|proxy\.ts|matcher|hreflang|翻译/i, target: 'semantic/i18n.md', label: 'i18n' },
  { pattern: /blocks?|payload.*正文|content.model|search.*索引/i, target: 'semantic/content-model.md', label: '数据模型' },
  { pattern: /vercel|deploy|部署|env|native|sharp|esbuild/i, target: 'semantic/deploy-ci.md', label: '部署/CI' },
  { pattern: /guardrail|banned.?term|正则|PowerShell|脚本/i, target: 'semantic/tooling.md', label: '工具/脚本' },
  { pattern: /先搜索|gh search|issue.*#|报错.*排查/i, target: 'procedural/troubleshooting.md', label: '排查方法' },
  { pattern: /验证|playwright|截图|smoke|gate/i, target: 'procedural/verification.md', label: '验证' },
  { pattern: /新建.*页面|新.*route|预览页|硬编码|字典|useTranslations/i, target: 'procedural/new-page.md', label: '新建页面流程' },
  { pattern: /agent.*行为|复盘|默认行为|惯例/i, target: 'procedural/agent-behavior.md', label: 'Agent 行为' },
];

function daysAgoISO(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function main() {
  const daysIdx = process.argv.indexOf('--days');
  const days = daysIdx !== -1 ? parseInt(process.argv[daysIdx + 1], 10) || 7 : 7;
  const cutoff = daysAgoISO(days);

  let files;
  try {
    files = readdirSync(PROGRESS_DIR).filter((f) => f.endsWith('.md'));
  } catch {
    console.log(`[consolidate] progress dir not found: ${PROGRESS_DIR}`);
    process.exit(0);
  }

  const suggestions = [];
  for (const file of files) {
    const full = join(PROGRESS_DIR, file);
    let content;
    try {
      content = readFileSync(full, 'utf8');
    } catch {
      continue;
    }
    // 文件名或正文含最近 N 天日期的条目才纳入
    const dateHits = content.match(/\b20\d{2}-\d{2}-\d{2}\b/g) || [];
    const filenameDate = (file.match(/\b(20\d{6})\b/) || [])[1];
    const fileDate = filenameDate ? `${filenameDate.slice(0, 4)}-${filenameDate.slice(4, 6)}-${filenameDate.slice(6, 8)}` : null;
    const recent = dateHits.some((d) => d >= cutoff) || (fileDate && fileDate >= cutoff);
    if (!recent) continue;

    for (const { pattern, target, label } of RULES) {
      if (pattern.test(content)) {
        suggestions.push({ file, target, label });
      }
    }
  }

  if (suggestions.length === 0) {
    console.log(`[consolidate] 最近 ${days} 天的 progress 条目没有匹配到记忆文件规则。无需 curation。`);
    return;
  }

  console.log(`[consolidate] DRY-RUN 建议清单（最近 ${days} 天）——只提示，不写文件：\n`);
  const seen = new Set();
  for (const s of suggestions) {
    const key = `${s.file}→${s.target}`;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`  ${s.file}`);
    console.log(`    └─ [${s.label}] 提炼候选 → documention/harness/${s.target}\n`);
  }
  console.log(
    'Curation 步骤（人工/agent 编辑，非本脚本）：\n' +
      '  1. 打开对应 progress 文件，识别可复用的事实/规则\n' +
      '  2. 按 INDEX.md 路由表 append 到目标记忆文件（只写提炼结果，禁止粘贴原始日志段落）\n' +
      '  3. episodic 类事件写独立复盘文件并检查 INDEX 路由表是否需要注册'
  );
}

main();
