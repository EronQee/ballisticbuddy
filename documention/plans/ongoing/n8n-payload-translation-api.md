# N8n 自动翻译管线 · Payload REST API 文档

> 适用范围：B 期 4「N8n 自动翻译管线」的 Payload 侧接口契约。
> 前置要求：Payload Localization 已在 `src/payload.config.ts` 开启并完成数据库迁移
> （`src/migrations/20260902_081821_localization.ts`）。当前是 6 locale：
> `en`(默认) / `pt` / `ar`(RTL) / `es` / `fr` / `ru`，单一事实来源 `src/i18n/localization.ts`。

## 1. 认证

生产环境 Payload 的 REST API 受 access control 保护，翻译任务需要一个可用的管理员凭据。

- **方式一（推荐）**：为翻译机器人建一个专用 admin 用户，勾选 API Key，
  调用时带 `Authorization: users API-Key <你的key>`。
- **方式二**：管理员登录后拿到的 JWT：`Authorization: JWT <token>`。
- `overrideAccess`：不要在生产用（会绕过权限判断），翻译脚本用专用管理员账号即可。

## 2. 读：一次性取所有 locale

### 2.1 单个文档

```
GET /api/posts/{id}?locale=all&depth=0&limit=1
GET /api/pages/{id}?locale=all&depth=0&limit=1
```

`locale=all`（等价 `locale=*`）会让**每个本地化字段**以「按 locale 键名」的对象返回：

```jsonc
{
  "id": 1,
  "slug": "hello-world",           // 未本地化，全 locale 共享
  "title": {
    "en": "Hello world",
    "pt": "Olá, mundo",
    "ar": "مرحبا بالعالم"
    // ... 其余 locale 缺省时 Payload 不返回该键；本地读它没翻译到
  },
  "content": {
    "en": { "root": { "children": [/* lexical editorState */] } },
    "pt": { "root": { "children": [/* lexical editorState */] } }
  },
  "meta": {
    "title": { "en": "Hello world | Site", "pt": "Olá, mundo | Site" },
    "description": { "en": "...", "pt": "..." }
  }
}
```

> 注意：**未翻译的 locale 在 `*` 键对象里通常不出现**（有 fallback 也不回填到 `_i18n`）。
> 翻译脚本要区分「没值」与「值为空标题」。

### 2.2 列表 + 分页批量拉取

```
GET /api/posts?locale=all&depth=0&limit=100&page=1&where[locale]{eq}=en
```

`where` 基于默认 locale 查：数据库里 `locale` 字段等于当前文档语言的记录才命中。
配合 `page` 分页逐批拉全量，`response.totalDocs` 给总数。

### 2.3 Globals（Header / Footer）

```
GET /api/globals/header?locale=all
GET /api/globals/footer?locale=all
```

`navItems[].link.label` 是本地化字段。

## 3. 哪些字段是本地化的（翻译脚本的字段清单）

| 集合/全局 | 字段路径 | 类型 | 备注 |
|---|---|---|---|
| posts | `title` | text | |
| posts | `content` | richText | lexical editorState（见 §6） |
| posts | `meta.title` / `meta.description` | text | plugin-seo，默认 localized |
| pages | `title` | text | |
| pages | `hero.richText` | richText | lexical |
| pages | `hero.links[].link.label` | text | 经 `fields/link.ts` 统一定义 |
| pages | `layout` 下各 block 的 richText / link.label | 见 blocks | CTA/Content/Archive/FormBlock |
| pages | `meta.title` / `meta.description` | text | plugin-seo，默认 localized |
| header/footer | `navItems[].link.label` | text | |
| forms 及其子表 | `label` / `defaultValue` / `confirmationMessage` / `submitButtonLabel` / email `subject` / `message` | 混合 | form-builder 插件字段默认 localized |
| search（搜索引擎） | `title` 等 | | 索引集合，由 posts 同步，翻译 posts 后重跑 beforeSync 即可 |
| 不本地化 | `slug`、`media` upload、`type/select` 配置、`categories`、`authors`、`publishedAt` | | slug 全 locale 共享 → URL 结构 `/pt/{slug}` 只是加语言前缀 |

## 4. 写：按 locale 回写

局部更新（只发本 locale 的字段，Payload 只覆盖该 locale 的值，其它 locale 不动）：

```
PATCH /api/posts/{id}?locale=pt
Content-Type: application/json

{
  "title": "Olá, mundo",
  "content": { "root": { "children": [...] } },
  "meta": { "title": "Olá, mundo | Site", "description": "..." }
}
```

三要素：
1. **URL 带 `?locale=pt`** —— 决定写进哪个 locale 的 `*_locales` 表。
2. **body 里是本 locale 的标量/结构值**（不是 `{en,pt}` 对象）。
3. 后置步骤：该请求会触发 collection 的 `afterChange` hook（本项目的 `revalidatePost/revalidatePage`），
   前台 ISR 缓存会自动失效。

Globals 同理：

```
PATCH /api/globals/header?locale=pt
{
  "navItems": [ { "link": { "type": "reference"|"custom", "label": "Início", ... } } ]
}
```

> 写入时**不要回传** `id`、`_status`、`slug`、`updatedAt` 之外的元字段，避免误改。

## 5. 草稿 / 发布语义

- `versions.drafts` 开启的集合，普通 PATCH 创建的是用户编辑意图（存 draft）。
- 若要同步「已发布」内容，PATCH 时带 `?draft=false`（明确更新 published 版本）。
- `_status` 是单值（未开启 `localizeStatus` 实验特性），跨 locale 共用一个发布状态。
  翻译未完成前不要让 target locale 的文档处于 `published` 且内容为空——fallback 会兜底显示英文，
  参见 `documention/harness/semantic/payload.md`（draft/publish 节）。

## 6. RichText（lexical editorState）处理规则——勿整段翻译 JSON

posts/pages/blocks 的正文是 **Lexical editorState**（JSON 结构，含节点类型、marks、链接等）。
**千万不要把整个 `root` 的 JSON 丢给翻译模型**：

- 只摘取**文本叶节点**（`node.type === 'text'` 的 `node.text`）参与翻译；
- 回写时保持**结构、顺序、`type`、`format`、`url` 等元数据不变**，只替换文本；
- 识别要忽略的文本：代码块（`type === 'code'`）、代码行、URL/相对路径、
  占位符、语言无关的数字/单位；
- 遍历可写成通用递归 walker：

```ts
function walk(node) {
  if (node.type === 'text') { translate(node.text); }
  if (Array.isArray(node.children)) node.children.forEach(walk);
  if (node.type === 'block') node.fields?.forEach?.((b) => walk(b));
}
```

> 若新 locale 还没有翻译，PATCH 时把整个 editorState 结构按 §6 替换成英文结构的副本即可复用格式。

## 7. Fallback 语义（对翻译管线的影响）

- 配置用了 `fallback: true`（Payload 默认）：某 locale 字段缺值时，前台读到默认 locale 的值。
- **推荐在工作流里加一个「跳过已翻译」判据**：`?locale=pt` 读标题，若 vs `?locale=all` 后
  `_i18n.pt.title` 已有值且等于默认 locale，则跳过（避免重复翻译/覆盖人工翻译成果）。
- SEO 侧：对应 sitemap（`pages-sitemap.xml` / `posts-sitemap.xml`）已按全 locale 枚举 hreflang，
  翻译尽早补齐可避免 en-fallback 页面被反复抓取。

## 8. n8n 落地草图

```
Schedule Trigger / Manual
  → HTTP Request: GET /api/posts?locale=all&depth=0&limit=100&page={{$node["..."].json.page}}&where[locale][eq]=en
  → Code(JS): 按 §3 提取每文档字段、按 §6 递归抽文本、组装待翻译 dict、标记已翻译跳过
  → (可选) AI Agent / HTTP 调 DeepL 批量翻译
  → Code(JS): 把译文按 §4 结构重组（保留 lexical 结构）
  → Split Out Batches (每批 N 条)
  → Loop Over Items
      → HTTP Request: PATCH /api/posts/{id}?locale={pt}   body=本locale字段
```

注意：
- 每次 PATCH 只写一个 locale；6 个 locale 串行或按 `Loop Over Items` 放大。
- 失败重试 + 幂等：PATCH 天然幂等（整值覆盖），重试安全。
- 先跑 staging/personal 库验证，再放生产 schedule；记忆规则见
  `documention/harness/semantic/i18n.md`。