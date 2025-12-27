---
title: P0 端到云闭环架构
draft: false
---

# P0 架构（Edge Sense）

> 目标：一眼看懂数据怎么上云、命令怎么下发、问题怎么定位。

## 系统总览（端→边→云）

```text
STM32（F411/F103）
  |  UART（二进制帧：TELEMETRY/CMD/ACK，含 CRC）
  v
网关（mac 或 Raspberry Pi，Python）
  |  MQTT pub/sub（telemetry/cmd/ack）
  v
MQTT Broker（Mosquitto）
  |
  v
后端（FastAPI）
  |  入库 / 查询 / 下发命令
  v
DB（Postgres）
```

## 三条关键链路（你排障就按这三段拆）

1. **串口链路（设备↔网关）**
   - 关注：CRC、parser resync、ring buffer、ACK 超时
2. **MQTT 链路（网关↔云端）**
   - 关注：QoS1 重复投递 + `cmd_id` 幂等、断网重连、retain/LWT（可选）
3. **云端链路（后端↔DB↔API）**
   - 关注：命令状态机、索引与查询性能、可观测日志字段

## 规格与规则（不要在这里重复写）

- 协议/Topic/API/DB 的单一真相：[[P0_SPEC_v1]]
- 时序/并发/阻塞约束：[[实时规则]]
- 日志字段与链路追踪：[[日志规范]]
- 测试分层与故障注入：[[测试体系]]

---

> 更新时间：2025-12-24

