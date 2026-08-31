# 05-url-structure.md

> Capture date: 2026-09-01 | 依据：产品分类 + SERP 意图 + silo 架构（配合 05-site-map.md）

## URL 设计规则
1. **小写、连字符、语义化**：`/products/bulletproof-vehicle-glass/`
2. **产品页固定在 `/products/<product>`**，独立成页，不被 `/blog/` 前缀污染
3. **价格类独立 `/cost/<topic>`**，与产品页分离（避免 keyword cannibalization）
4. **TOFU/教育类独立 `/learn/<topic>`**，语义清晰（learning hub）
5. **规格类 `/specifications/<topic>`**（玻璃防护等级 hub）
6. **轮胎分类 `/tires/<topic>` + `/tires/run-flat-tires/<brand>`**
7. **语言分支用路径前缀 `/pt-br/`**（而非子域或参数），hreflang 互指
8. **信任页固定路径** `/about` `/contact` `/results` `/test-samples`（不复用 slug）

## 完整候选 URL 矩阵（子集预研）

### Glass Silo
```
/products/bulletproof-vehicle-glass/                 # money page - 主
/specifications/ballistic-glass-levels/              # 规格 hub - Level 1-10
/cost/bulletproof-glass-cost/                        # 价格文（独立）
/applications/armored-glass-for-homes/               # 应用扩展（Phase2+，optional）
```

### Tire Silo
```
/products/bulletproof-tires/                         # money page - 主（轮胎+内衬）
/tires/run-flat-tires/                               # run-flat hub（大词承接）
/tires/run-flat-tires/bmw/
/tires/run-flat-tires/bridgestone/
/tires/run-flat-tires/continental/
/tires/run-flat-tires/mercedes/
/tires/run-flat-vs-regular/                          # 对比页（KD1）
/cost/bulletproof-tires-cost/                        # 价格文（独立）
/cost/run-flat-tires-cost/                           # 价格文（独立）
/learn/are-bulletproof-tires-real/                   # 信任教育
```

### Armored Vehicles Hub（整机，长尾承接 + 改装转化）
```
/armored-vehicles/                                   # hub
/armored-vehicles/bulletproof-cars/                  # car for sale / used 词
/armored-vehicles/manufacturers/                     # armored car manufacturers（UAE）
/cost/bulletproof-car-cost/                          # how much is a bulletproof car
/learn/armored-vehicle-basics/                       # armored vehicle 101（KD44 大词长尾）
```

### TOFU / Learning（JTBD 视角问题页）
```
/learn/how-to-bulletproof-a-car/                     # how to bulletproof a car
/learn/how-to-protect-your-vehicle/                  # civilians 安全
/learn/carjacking-prevention/                        # carjacking prevention
/learn/vip-vehicle-protection/                       # armored car vip
/learn/glass-101-what-is-bulletproof-glass/          # what is / how to make
/learn/is-bulletproof-glass-really-bulletproof/      # AI 回答块
/learn/install-fit-guide/ (Phase2)
```

### Trust / Conversion（固定路径）
```
/
/about
/contact
/results
/test-samples
```

### Language Branch (Phase 优先级：pt-br 先行, 后 ar/es/fr 视数据)
```
/pt-br/carro-blindado/                               # 巴西主词 money page
/pt-br/products/bulletproof-vehicle-glass/           # 葡语玻璃页
/pt-br/products/bulletproof-tires/                   # 葡语轮胎页
/pt-br/cost/ (葡语价格文)
```
**实施**: Payload 用多语言字段或克隆 Collection;在 Custom API 端接 DeepL/LLM 批量翻译；路由用 `/(locale)` 前缀 + `hreflang`。

## 关键防重叠规则（cannibalization guard）
- **一个 canonical 意图占一个 URL**：`cost` 类的词全给 `/cost/`，产品页不写"价格"标题
- **run flat 大词只给 hub**，品牌词才做子页，避免 hub 抽干子页
- **巴西葡语走 /pt-br/** 而非英文页混排，避免语言关键词稀释
- **不建 `/blog/bulletproof-glass` 之类与产品页同词的博客页**