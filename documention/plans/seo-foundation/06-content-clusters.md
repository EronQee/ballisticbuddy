# 06-content-clusters.md

> Capture date: 2026-09-01 | 配合 03-keyword-master.csv 与 05-site-map.md
> 原则：每个资产有唯一意图、证据、内链、下游动作；避免 quota 驱动的灌水内容与互相蚕食。

## Cluster A：防弹车玻璃（Vehicle Glass）
**Hub**: `/products/bulletproof-vehicle-glass/`（money page）

| 资产 | 类型 | 主词 | 证据需求 | 内链目标 |
|---|---|---|---|---|
| 产品 money page | money | bulletproof glass / for car / for sale | 测试报告+打靶视频+规格表 | → /cost/, /test-samples, /results |
| 规格 hub | spec | level x / thickness / material | 各等级参数表 | → 产品页, /cost/ |
| 玻璃价格文 | cost | glass price / cost | 真实价格区间 | → 产品页, /test-samples |
| 家庭应用页 | application | glass for homes | 应用案例 | → 产品页（optional） |
| 玻璃 101 | edu | what is / really bulletproof / illegal | 官方标准引用 | → 产品页, /results |
| 打靶实测内容 | trust | （品牌词） | 实测视频+报告 | → 产品页, /test-samples |

## Cluster B：防弹轮胎（Bulletproof Tires）
**Hub**: `/products/bulletproof-tires/`（money page）

| 资产 | 类型 | 主词 | 证据需求 | 内链目标 |
|---|---|---|---|---|
| 产品 money page | money | bulletproof tires | 穿刺测试视频+规格 | → /cost/, /test-samples |
| run-flat hub | hub | run flat tires（22.2k 大词） | 消费级科普 | → 品牌子页, 产品页 |
| run-flat 品牌子页 | brand | run flat bmw/mercedes/bridgestone | 适配清单 | → hub, 产品页 |
| run-flat vs regular | comparison | vs regular | 对比表 | → hub, 产品页 |
| 轮胎价格文 | cost | bulletproof tires price | 真实价格区间 | → 产品页 |
| 轮胎教育文 | edu | are they real / legal | 演示视频 | → 产品页, /results |

## Cluster C：防弹整车（Armored Vehicles）
**Hub**: `/armored-vehicles/`（长尾承接，转化路径=玻璃+轮胎改装套件）

| 资产 | 类型 | 主词 | 证据需求 | 内链目标 |
|---|---|---|---|---|
| 整车 hub | hub | armored car（KD43 大词长尾） | 合作改装案例 | → 产品页 A+B |
| 整车在售/二手 | listing | cars for sale / used | 车源（或跳过） | → 玻璃/轮胎页 |
| 整车价格文 | cost | how much is a bulletproof car | 行业价格区间 | → 产品页, /test-samples |
| 制造商对比 | comparison | manufacturers | 竞品档案 | → hub |
| 整车 101 | edu | armored vehicle basics | 分类科普 | → hub, cost |

## Cluster D：TOFU / 安全（JTBD 问题入口）
**入口页**: `/learn/*`

| 资产 | 类型 | 主词 | 转化路径 |
|---|---|---|---|
| how to bulletproof a car | tofu | how to bulletproof a car | → 玻璃+轮胎产品页 |
| how to protect your vehicle | tofu | armored vehicles for civilians | → 玻璃页 |
| carjacking prevention | tofu | carjacking prevention | → 玻璃页 |
| vip vehicle protection | tofu | armored car vip | → 整车 hub |
| （Phase2）最危险城市系列 | tofu | dangerous cities | → 产品页（差异化原创） |

## Cluster E：信任/转化（固定页，不做关键词页面）
- `/results`（实测证据中枢）、`/test-samples`（样品申请）、`/about`（工厂资质）、`/contact`（询盘）

## 内容不做的（防稀释）
- 不做 `/blog/bulletproof-glass` 与产品页同词
- 不做"防弹装备合集"大而全（远离与产品无关的 vest/jacket 词，如尼日利亚 `bulletproof vest`）
- 不做整车主词正面硬刚（KD 43 留给 hub 长尾）
