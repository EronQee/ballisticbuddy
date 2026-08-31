# 05-site-map.md

> Capture date: 2026-09-01 | 依据：产品分类 + 关键词调研 + SERP 意图 + UD Machine 架构模型
> 原则：每个 URL 有角色、父级、转化路径、canonical 意图。MVP 不追求页数，追求每个意图都有归属页。

## 顶层信息架构

```
ballisticbuddy.com
│
├── Homepage (/) ............ 品牌 + 定位 + 两大产品入口 + 信任证据 + 询盘 CTA
│
├── [SILO 1] Vehicle Glass (/products/bulletproof-vehicle-glass/)
│     ├─ 产品 money page（主）
│     ├─ 规格 hub：/specifications/ballistic-glass-levels/
│     │     ← level 1-10 / thickness / material 词
│     ├─ 价格文章：/cost/bulletproof-glass-cost/
│     │     ← bulletproof glass price / cost
│     └─ 应用页：/applications/armored-glass-for-homes/ (optional)
│
├── [SILO 2] Bulletproof Tires (/products/bulletproof-tires/)
│     ├─ 产品 money page（主）→ tire inserts
│     ├─ Run-Flat hub：/tires/run-flat-tires/
│     │     └─ 品牌子页：/tires/run-flat-tires/bmw|bridgestone|mercedes|continental/
│     ├─ 对比页：/tires/run-flat-vs-regular/
│     ├─ 价格文章：/cost/bulletproof-tires-cost/ + /cost/run-flat-tires-cost/
│     └─ 教育页：/learn/are-bulletproof-tires-real/
│
├── [Hub] Armored Vehicles (/armored-vehicles/)
│     ├─ 整机概览 hub（承接 armored car 大词长尾）
│     ├─ 子页：/armored-vehicles/bulletproof-cars/（car for sale / used）
│     ├─ 对比：/armored-vehicles/manufacturers/（UAE armoring 词）
│     ├─ 全车价格文：/cost/bulletproof-car-cost/
│     │     ← how much is a bulletproof car
│     └─ 说明：MVP 不卖整机？→ 该 hub 的转化路径=玻璃+轮胎改装套件 + 引用客户做整机
│
├── [TOFU / Learn] (/learn/*)
│     ├─ /learn/how-to-bulletproof-a-car/
│     ├─ /learn/how-to-protect-your-vehicle/
│     ├─ /learn/carjacking-prevention/
│     ├─ /learn/vip-vehicle-protection/
│     ├─ /learn/armored-glass-101/  (what is bulletproof glass)
│     ├─ /learn/armored-glass-guide/ (is it really bulletproof / illegal)
│     └─ /learn/armored-vehicle-basics/
│     → 每篇 TOFU 尾部指向对应 money page（JTBD：你的问题 → 我们的方案）
│
├── [Trust] (/about /results /quotable)
│     ├─ /about（工厂+产线资质）
│     ├─ /results（测试报告/实测视频/原理说明）← "实测说话"的信任中枢
│     ├─ /test-samples（付费样品申请页）← 核心转化机制
│     └─ /contact（询盘表单）
│
├── [Language branch] /pt-br/ **（巴西，carro blindado 9.9k/mo）
│     └─ /pt-br/carro-blindado/ + 葡语版玻璃+轮胎页（hreflang 关联）
│
└── [Supporting]
      ├─ /cost/*（独立价格文章，每个有真实价格区间 + 免责声明）
      └─ /blog/（可选，发布行业文章/更新）
```

## 为什么这样设计（对应 UD Machine 模型）
1. **Money page = 产品 + 规格 + 应用 + FAQ + 内链枢纽**，不硬塞价格（价格独立成文，见下）
2. **价格意图 = 独立 cost 文章**，不与 money page 抢 canonical（SERP 显示价格文霸屏）
3. **独立产品 silo = 玻璃 / 轮胎各一套**（规格体系、证据、工具、对比、内容分类各自独立）
4. **TOFU 从问题出发（JTBD）**，不直接卖产品，结尾自然流向 money page
5. **信任中枢 /results + /test-samples** 承载你的独家定位优势（实测说话）

## MVP URL 清单（Phase 1 必须上线）
| # | URL | 角色 | 主词 |
|---|---|---|---|
| 1 | / | 首页 | 品牌 |
| 2 | /products/bulletproof-vehicle-glass/ | Money page | bulletproof glass, for car, bullet resistant, armored glass |
| 3 | /products/bulletproof-tires/ | Money page | bulletproof tires, bullet proof tires, resistant tires |
| 4 | /specifications/ballistic-glass-levels/ | 规格 hub | level x glass, thickness, material |
| 5 | /tires/run-flat-tires/ | Run-Flat hub | run flat tires |
| 6 | /tires/run-flat-vs-regular/ | 对比页 | run flat vs regular |
| 7 | /cost/bulletproof-glass-cost/ | 价格文 | bulletproof glass price/cost |
| 8 | /cost/bulletproof-car-cost/ | 价格文 | how much is a bulletproof car |
| 9 | /cost/bulletproof-tires-cost/ | 价格文 | bulletproof tires price |
| 10 | /test-samples | 转化页 | 样品申请 |
| 11 | /results | 信任页 | 测试证据 |
| 12 | /learn/how-to-bulletproof-a-car/ | TOFU | how to bulletproof a car |
| 13 | /learn/are-bulletproof-tires-real/ | 教育/信任 | are bulletproof tires real |
| 14 | /pt-br/carro-blindado/ | BR 分支 | carro blindado |
| 15 | /about + /contact | 信任+转化 | 品牌 |