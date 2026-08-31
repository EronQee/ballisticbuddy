# 04-serp-intent-map.md

> Capture date: 2026-09-01 | 数据源：dataforseo SERP organic 实测 12 词 + keywords.ideas serp_item_types
> 原则：任何关键词在成为页面之前，先被 SERP 意图验证（Stage 4 gate）

## 每 cluster 的主导页面类型与内容角度

| Cluster | 代表词 | 主导意图 | SERP 主导内容类型 | 页面类型决策 |
|---|---|---|---|---|
| glass-core | bulletproof glass / for car / for sale | transactional | 产品页 + 规格页 + 少量博客（tssbulletproof 产品页 rank 3） | **Money page（产品/规格页）**；同义变体全收 |
| glass-spec | level x glass / thickness / material | informational→transactional | AI Overview + 规格解读 + 产品页混合 | **规格 hub 页 + 独立 cost 文** |
| glass-cost | price / cost | commercial | 价格文 + 产品页（defenselite/silatec 的价格博客霸屏） | **独立 cost 文章**（不塞进产品页） |
| glass-adjacent | for homes / store | transactional | 建筑玻璃应用 | MVP 期 optional，放应用页 |
| vehicle-core | armored car / vehicles for sale | informational→transactional | Inkas/Alpine 的整车主站（rank 1-2）+ wiki | **Hub 页**（KD 43 不硬碰，靠长尾打） |
| vehicle-cost | how much is a bulletproof car | informational/commercial | AI Overview + 价格文 + Quora | **独立 cost 文章**，强 AI Overview 机会 |
| vehicle-tofu | armored vehicles for civilians / how to bulletproof a car | informational | ArmorMax 榜单文霸屏 + Reddit/Quora | **TOFU 科普文**，差异化角度 |
| tire-core | bulletproof tires | transactional | 专业页（bulletprooftire.com/carlisletyrfil）+ Reddit 问答 | **Money page（产品页）**，KD 0 机会巨大 |
| tire-runflat | run flat tires / bmw / bridgestone | informational/transactional | 消费级大词，品牌词页（Pirelli/Bridgestone） | **Hub + 品牌子页**（BMW/Mercedes）引流 |
| tire-cost | bulletproof tires price / run flat price | commercial | AI Overview + 价格文 | **独立 cost 文章** |
| tire-tofu | are bulletproof tires real / legal | informational | AI Overview + Reddit 讨论 | **信任/教育文**（呼应实测定位） |
| tofu-safety | carjacking prevention / what is carjacking | informational | AI Overview + 官方/新闻 + 视频 | **TOFU 安全文**（JTBD 入口） |
| br / ng / za / ae | 各国主词 | 混合 | 本地站 + 分类目录（OLX/Webmotors） | 各国独立页面/分支，巴西 carro blindado 优先 |

## AI Overview 高发词（Stage 9 重点关注）
以下词的 SERP 都出现 `ai_overview`，AI 会先回答，必须准备 AI-citable 内容块（事实型、带来源）：
- bulletproof glass / for car / for homes / material / price
- how much is a bulletproof car / how much to armor a car
- bulletproof tires / are they real / legal
- run flat tires vs regular / price
- armored vehicles for civilians
- carro blindado

## 关键结论
1. **没有哪个高价值词是纯 informational 无从转化的**——价格/规格/安全类词都通向购买决策。
2. 玻璃垂类最适合复制 tssbulletproof 路径：**规格页 + 价格文** 双管齐下。
3. 轮胎垂类 `bulletproof tires` KD 0，几乎是空白，是**最快的首胜词**。
4. 竞品 ArmorMax 用"危险城市"霸屏 TOFU → 需差异化（原创角度/数据源/可视化），不正面硬刚。
