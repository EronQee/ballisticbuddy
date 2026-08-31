# 02-competitor-patterns.md

> Capture date: 2026-09-01 | 数据源：dataforseo SERP organic + domain.ranked_keywords（按 ETV 排序，实时）
> 标注：`fact`=实时 API 观测；`inference`=由数据推出的合理判断

## 竞品清单（SERP 首页反复出现的域名）

| 竞品 | 主市场 | 定位 | 规模信号 |
|---|---|---|---|
| inkasarmored.com | 美国/全球 | 整车主词站（防弹车成品） | 2,745 词排名，ETV ~81.5K |
| armormax.com | 美国 | 装甲改装 + 内容营销 | 7,245 词，ETV ~94K |
| alpineco.com | 美国 | 装甲车销售 | 3,011 词，ETV ~30.7K |
| tssbulletproof.com | 美国 | 纯防弹玻璃/门窗 | 2,192 词，ETV ~13.3K |
| bulletproofautomotive.com | 美国 | 汽车改装件（大而全） | 14,592 词，ETV ~89K |
| revolutionblindados.com.br | 巴西 | 防弹车（里约） | 50 词，ETV ~576 |
| svi.co.za / armouredmobility.co.za | 南非 | 防弹车 | 本土玩家 |
| dubicars.com / inkas.ae | 阿联酋 | 防弹车/二手车 | 本土+Inkas |

## 关键模式（fact）

### 1. 流量密码是"危险城市榜单"类 TOFU 内容
- `armormax.com` 顶级流量词全是榜单文：
  `most violent cities america` 74k/月、`most dangerous city of the world` 14.8k/月
  全部排向同一个 `/blog/top-10-most-dangerous-cities-in-america-2026` 页面。
- `inference`: 这种"XX最危险城市"内容天然吸引"我住的地方安全吗→我需要防护吗"的高意向读者，
  是防弹行业最有效的 TOFU→MOFU 引流机。**你的站也可以做**（Top 10 Most Dangerous Cities 2027 等），
  但需原创角度 + 数据来源，避免和 ArmorMax 撞车（他们首页 #2-7 霸屏）。

### 2. 玻璃垂类竞品（最像你）靠规格词+价格词吃量
- `tssbulletproof.com` 顶级词：`bulletproof glass` 5.4k/月 rank2、`ballistic glass` 1.6k rank1、
  `bulletproof glass cost` 590 rank1、`bullet proof glass window` 880 rank2。
- `inference`: 垂类玻璃站没有依赖"危险城市"内容，而是死磕**规格词 + 价格词**，全排进首页。
  你的玻璃线应该模仿这条路径：规格（level/厚度）+ 价格 + 应用。

### 3. Inkas 靠"多规格变体 + 主域堆排名"
- 同一页面 `/` 同时排 `armored car`/`armoured car`/`armoured cars`/`bullet proof car` 等多个同义变体，
  ETV 每条 1.3-2k。说明**同义/英美拼写变体（armor/armour、tire/tyre、proof/proofing）都要建词**。

### 4. 巴西本地站占位弱，机会大
- `revolutionblindados.com.br` 只有 50 词、ETV 576，但 `carro blindado` 9.9k/月它只排第 9。
- `inference`: 巴西市场流量大但本地 SEO 弱 → 葡语页面前景好，但要本地化（.com.br 域名做不了，
  用 /pt-br/ 或子域 + hreflang 做）。

## 可抄 + 有条件抄 + 不抄

### 可抄（低成本、可复现）
- 规格词（level x glass / thickness）+ 价格词（cost / how much）专门页
- 同义/英美拼写变体全收录
- 独立 cost 文章（价格透明，呼应"实测说话"的真诚定位）
- TOFU 榜单内容（危险城市/顶级防弹车，原创 + 数据源）

### 有条件抄（需要差异化）
- "最危险城市"系列 → 必须换角度（如按州、按犯罪类型、数据可视化），否则正面撞 ArmorMax
- 整车主词（armored car 等）→ KD 43 太高，MVP 别硬碰，用长尾打

### 不抄 / 风险
- 大而全改装件站（bulletproofautomotive 模式）→ 稀释主题，与垂类定位冲突
- 无证据的夸张防护宣称 → 与"实测说话"定位冲突，且有平台风险
