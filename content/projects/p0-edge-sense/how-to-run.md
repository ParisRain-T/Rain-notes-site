---
title: P0 运行指南
draft: false
---

# P0 运行指南（How to Run）

> 这页只写“最小可跑”，细节以 Gate 和规格为准。

## 你需要跑起来的 3 个东西

1. 设备端（STM32）：能发 telemetry、能收 cmd、能回 ack（无传感器可 mock）
2. 网关（Python）：串口↔MQTT 双向通
3. 云端（docker compose）：Mosquitto + FastAPI + Postgres 一键启动

## 最小运行路径（推荐按 Gate 做）

- Gate 入口：[[执行路径]]
- 规格对齐：[[P0_SPEC_v1]]
- 过关线：[[DoD清单]]

## 验收方式（你只需要记住一句）

“**用脚本验收，不用目测**”（脚本层次见 [[测试体系]]）。

---

> 更新时间：2025-12-24

