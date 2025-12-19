---
title: MQTT 协议入门
draft: false
tags:
  - iot
  - mqtt
  - protocol
---

# MQTT 协议入门

> 目标：读完能解释概念 + 能跑通最小 demo + 知道“掉线/重复/乱序”怎么应对。

## MQTT 是什么

MQTT 是一个轻量的发布/订阅（Pub/Sub）消息协议，适合带宽受限、连接不稳定、设备数量多的场景。

你可以把它理解成：
- **Broker**：消息中转站（服务器）
- **Publisher**：发布消息的一方（设备/服务）
- **Subscriber**：订阅消息的一方（服务/看板/设备）
- **Topic**：消息的“频道/路径”（如 `devices/rain-001/telemetry`）

## 为什么 IoT 常用 MQTT（而不是 HTTP）

- 连接保持：长连接，适合持续上报
- 解耦：设备只管发，服务按 topic 消费
- 弱网友好：QoS 与会话机制能提升可靠性

## QoS（你只需要先记住这句）

- `QoS 0`：最多一次（可能丢）
- `QoS 1`：至少一次（可能重复，必须做幂等）
- `QoS 2`：恰好一次（开销更大，很多场景用不上）

> 实践建议：遥测上报先用 `QoS 0/1`；控制命令通常用 `QoS 1`，然后在业务层做去重/幂等。

## Topic 设计（最小可用规范）

- 以“谁”的维度做分组：`devices/<deviceId>/...`
- 以“用途”区分：`telemetry`（遥测）/ `events`（事件）/ `cmd`（命令）/ `cfg`（配置）

示例：
- `devices/rain-001/telemetry`（周期数据）
- `devices/rain-001/events`（异常/告警）
- `devices/rain-001/cmd`（下发命令）

## 可靠性三件套（IoT 一定会遇到）

- **断线重连**：指数退避（不要疯狂重试）
- **重复消息**：`QoS 1` 可能导致重复，业务必须幂等（例如带 `msgId`）
- **离线处理**：设备离线时命令怎么办（丢弃/保留/过期）

## 最小 Demo（概念级）

你只需要能说清楚这两件事：
- 设备 publish：把数据发到 `devices/<id>/telemetry`
- 服务 subscribe：订阅 `devices/+/telemetry` 收集数据入库/展示
