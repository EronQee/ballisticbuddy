#!/usr/bin/env node
/**
 * BallisticBuddy guardrail gate — deterministic checks that must pass before any
 * user-facing change ships. "Constraints in code, not in prompts" (AGENTS.md
 * §9 is declarative; this script is the enforceable version).
 *
 * Checks:
 *  1. banned-terms — internal jargon must never appear on user-facing
 *                    surfaces (pages, metadata, seed content, copy).
 *  2. html-theme-gate — any route-group layout that renders its own <html>
 *                    must set data-theme or mount <InitTheme />, otherwise
 *                    globals.css `html { opacity: 0 }` renders the whole
 *                    route invisible (white screen with 200 + valid DOM).
 *
 * Usage: node scripts/check-guardrails.mjs [--dirs src]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DEFAULT_DIRS = ["src", "public"];

// ── banned terms ────────────────────────────────────────────────────────
// Whole-word / boundary-anchored so substrings never trip false positives.
// Add internal process/tooling jargon here — never render it on user surfaces.
const BANNED = [
  { pattern: /\bRAG-confirmed\b/i, reason: "internal verification jargon (AGENTS.md §9)" },
  { pattern: /\bRAG\b/i, reason: "RAG is an internal process, not a product fact" },
  { pattern: /\binternal source\b/i, reason: "reveals internal process on user-facing surface" },
  { pattern: /\b(TOFU|MOFU|BOFU)\b/i, reason: "funnel-marketing internal jargon" },
  { pattern: /\bticket ID\b/i, reason: "internal tracking terminology on user-facing surface" },
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip node_modules/.next/dist/.git/uploads
      if (/node_modules|\.next|(^|[\\/])dist([\\/]|$)|\.git$/.test(full)) continue;
      walk(full, out);
    } else if (/\.(ts|tsx|js|mjs|jsx|json|md|html)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function checkBannedTerms(dirs) {
  const findings = [];
  for (const dir of dirs) {
    const abs = path.resolve(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of walk(abs)) {
      let text;
      try {
        text = fs.readFileSync(file, "utf8");
      } catch {
        continue;
      }
      for (const { pattern, reason } of BANNED) {
        const m = text.match(pattern);
        if (m) {
          const lineNo = text.slice(0, m.index).split("\n").length;
          findings.push({
            file: path.relative(ROOT, file).replace(/\\/g, "/"),
            line: lineNo,
            term: m[0],
            reason,
          });
        }
      }
    }
  }
  return findings;
}

function checkHtmlThemeGate() {
  const findings = [];
  const appDir = path.join(ROOT, "src", "app");
  if (!fs.existsSync(appDir)) return findings;

  function walkLayouts(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (/node_modules|\.next|\.git$/.test(full)) continue;
        walkLayouts(full);
      } else if (/^layout\.(ts|tsx|js|jsx)$/i.test(entry.name)) {
        let text;
        try {
          text = fs.readFileSync(full, "utf8");
        } catch {
          continue;
        }
        if (!/<html[\s>]/.test(text)) continue;
        if (!/data-theme\s*=/.test(text) && !/<InitTheme\b/.test(text)) {
          findings.push({
            file: path.relative(ROOT, full).replace(/\\/g, "/"),
            line: null,
            term: "<html> without data-theme/InitTheme",
            reason:
              "layout renders its own <html> but never sets data-theme; " +
              "globals.css keeps `html { opacity: 0 }` and the whole route is invisible",
          });
        }
      }
    }
  }
  walkLayouts(appDir);
  return findings;
}

async function main() {
  const args = process.argv.slice(2);
  const dirsArg = args.find((a) => a.startsWith("--dirs="));
  const dirs = dirsArg
    ? dirsArg.split("=")[1].split(",").map((s) => s.trim()).filter(Boolean)
    : DEFAULT_DIRS;

  const banned = checkBannedTerms(dirs);
  const themeGate = checkHtmlThemeGate();

  const all = [...banned, ...themeGate];
  if (all.length === 0) {
    console.log("[guardrails] PASS — no banned terms; all <html> layouts set the theme gate.");
    process.exit(0);
  }

  console.log(`[guardrails] FAIL — ${all.length} finding(s):\n`);
  for (const f of all) {
    console.log(`  ✗ ${f.file}${f.line ? `:${f.line}` : ""}  ${f.term}`);
    console.log(`      ${f.reason}`);
  }
  process.exit(1);
}

main();
