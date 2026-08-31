# 13-90-day-roadmap.md

> Capture date: 2026-09-01 | 依据：全部分析产出；按依赖与人力容量排序
> 目标：90 天内上线可索引、可转化、有信任证据支撑的核心页面，并建立测量基线。

## 阶段 0：上线准备（Day 1-10）
| 任务 | 交付物 | 依赖 |
|---|---|---|
| 购买并绑定 ballisticbuddy.com | DNS/环境 | 域名 |
| 补齐证据素材：测试报告扫描件、打靶视频、规格书、工厂实拍 | 素材库 | 需业务方提供 |
| 决定转化路径：询盘表单字段 + 样品申请流程（样品收费规则） | /contact + /test-samples 表单 | 业务决策 |
| Payload 建 Product/TestSample Collection + Blocks（玻璃/轮胎规格块） | 开发 | 素材 |
| 设置 GA4 + GSC + 提交 sitemap | 测量基线 | 域名 |

## 阶段 1：核心 Money Pages（Day 11-30）
**依赖：证据素材 + 开发**
1. `/` 首页（三支柱定位 + 两产品入口 + 信任证据）
2. `/products/bulletproof-vehicle-glass/`（money page，规格+FAQ+内链）
3. `/products/bulletproof-tires/`（money page）
4. `/results`（实测证据中枢）+ `/test-samples`（样品申请）
5. `/about` + `/contact`

## 阶段 2：价格 + 规格（Day 31-50）
**依赖：价位数据 / 竞品定价**
6. `/cost/bulletproof-glass-cost/`
7. `/cost/bulletproof-car-cost/`
8. `/cost/bulletproof-tires-cost/`
9. `/specifications/ballistic-glass-levels/`

## 阶段 3：Run-Flat + 教育（Day 51-70）
**依赖：阶段 1-2 上线**
10. `/tires/run-flat-tires/`（hub）
11. `/tires/run-flat-vs-regular/`
12. `/tires/run-flat-tires/bmw` + `/bridgestone`（品牌子页，快速流量）
13. `/learn/are-bulletproof-tires-real/`
14. `/learn/how-to-bulletproof-a-car/`

## 阶段 4：巴西 + 扩展（Day 71-90）
**依赖：英文站稳定 + 多语言实施**
15. `/pt-br/carro-blindado/` + 葡语玻璃/轮胎页（hreflang）
16. `/armored-vehicles/`（hub）+ `/cost/bulletproof-car-cost/` 落链
17. `/learn/carjacking-prevention/`
18. 首批外链：行业目录/防弹标准社区/车辆安全媒体（用 /results 实测内容做钩子）

## 阶段 5：持续（Day 90+）
- 月度 GSC 复盘：挖巴西/南非/阿联酋新词
- `armored vehicles for civilians`、`top 10 bulletproof cars` 等 TOFU 榜单内容（差异化原创）
- 多语言扩展：阿语（中东）→ 西语（拉美）→ 法语（非洲）
- 费率/竞品监测（可选 treg 批量复查）