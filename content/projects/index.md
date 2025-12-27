---
title: 项目
draft: false
---

# 项目

这里汇总我做过的项目。每个项目都包含完整的文档体系，方便面试官和读者深入了解。

## 项目总览

| 项目 | 状态 | 亮点 | 演示/仓库 |
|------|------|------|-----------|
| [[projects/p0-edge-sense/index|P0 端到云闭环（Edge Sense）]] | 进行中 | 端→边→云闭环、可复现部署、命令/ACK | 待补充 |
| [[projects/smart-car/index|智能小车]] | 研究中 | 嵌入式控制闭环 + 传感器融合 | [Repo](https://github.com/ParisRain-T/smart-car) |
| [[projects/desktop-arm/index|桌面机械臂]] | 研究中 | 多关节控制 + 示教路线 | 待补充 |
| [[projects/takeout-miniprogram/index|外卖小程序]] | 原型完成 | 端到端业务闭环 | [Repo](https://github.com/ParisRain-T/takeout-miniprogram) |

> 主线工程路线：P0（端到云闭环底座）→ P1（智能小车/机器人升级）。

## 项目列表

### 🌧️ P0 端到云闭环（Edge Sense）

> P0 底座项目：把协议/可靠性/可观测/可复现部署一次打穿

- [[projects/p0-edge-sense/index|项目总览]]
- [[projects/p0-edge-sense/architecture|系统架构]]
- [[projects/p0-edge-sense/how-to-run|运行指南]]
- [[projects/p0-edge-sense/decisions|技术决策]]
- [[projects/p0-edge-sense/changelog|更新日志]]
- [[projects/p0-edge-sense/devlog|开发日志]]

### 🍜 外卖小程序

> 多商户外卖平台，支持微信支付

- [[projects/takeout-miniprogram/index|项目总览]]
- [[projects/takeout-miniprogram/architecture|系统架构]]
- [[projects/takeout-miniprogram/how-to-run|运行指南]]
- [[projects/takeout-miniprogram/decisions|技术决策]]
- [[projects/takeout-miniprogram/changelog|更新日志]]

### 🚗 智能小车

> 嵌入式控制 + 传感器融合

- [[projects/smart-car/index|项目总览]]
- [[projects/smart-car/architecture|系统架构]]
- [[projects/smart-car/how-to-run|运行指南]]
- [[projects/smart-car/decisions|技术决策]]
- [[projects/smart-car/changelog|更新日志]]

### 🦾 桌面机械臂

> 运动控制 + 逆运动学

- [[projects/desktop-arm/index|项目总览]]
- [[projects/desktop-arm/architecture|系统架构]]
- [[projects/desktop-arm/how-to-run|运行指南]]
- [[projects/desktop-arm/decisions|技术决策]]
- [[projects/desktop-arm/changelog|更新日志]]

---

## 项目页标准结构

每个项目应包含以下页面：

| 文件 | 内容 |
|------|------|
| `index.md` | 项目总览（一句话概览、亮点、技术栈） |
| `architecture.md` | 系统架构图和技术选型说明 |
| `how-to-run.md` | 如何在本地运行项目 |
| `decisions.md` | 技术决策记录（ADR 格式） |
| `changelog.md` | 版本历史和更新日志 |
