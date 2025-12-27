---
title: P0 端到云闭环（Edge Sense）
draft: false
---

# P0 端到云闭环（Edge Sense）

> 一句话概览：用一套最小但完整的“端→边→云”系统，把工程能力（协议/可靠性/可观测/可复现部署）一次打穿；后续所有机器人/小车功能都复用这套底座。

## 这项目到底做什么（你只需要记住这条闭环）

**STM32（设备）→ 串口 → 网关（mac/Pi，Python）→ MQTT → 后端（FastAPI）→ DB → API/曲线 → 下行命令 → ACK 回执**

- 上行：设备持续上报 telemetry（无传感器先用 mock 数据也可以）
- 下行：云端 API 下发命令（如 LED/PWM/上报频率）→ 设备执行 → ACK 回执入库可查

## 你做完以后能证明什么

- 你不是“只会点灯/只会刷课”，你能交付一个可复现的端到云系统
- 你能讲清：协议、幂等、超时重试、日志追踪、故障注入、部署与验收
- 这套底座可以直接升级到 P1（智能小车）：把“设备侧”换成电机/编码器/IMU，把命令换成速度/转向即可

## 规范入口（单一真相）

- P0 规格（协议/Topic/API/DB）：[[P0_SPEC_v1]]
- Gate 执行计划：[[执行路径]]
- DoD 过关线：[[DoD清单]]
- 测试体系：[[测试体系]]
- 日志规范与排障：[[日志规范]] / [[错误码与故障字典]]

## 项目文档

- [[projects/p0-edge-sense/architecture|系统架构]]
- [[projects/p0-edge-sense/how-to-run|运行指南]]
- [[projects/p0-edge-sense/decisions|技术决策（ADR）]]
- [[projects/p0-edge-sense/changelog|更新日志]]
- [[projects/p0-edge-sense/devlog|开发日志]]

---

> 更新时间：2025-12-24

