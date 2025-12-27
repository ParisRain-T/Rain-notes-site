---
title: P0 规格（v1）：端到云闭环单一真相
draft: false
stage: budding
---

# P0_SPEC_v1（Single Source of Truth）

这份文档是 P0（端到云闭环底座）的**唯一规格来源**：协议、Topic、幂等、超时重试、DB、API 都以本页为准。  
当你发现“固件/网关/后端三边对不上”时，优先回到这里对齐，而不是在每一处“各修各的”。

> 主线默认：路径B（MCU → 串口 → PC/树莓派网关 → MQTT → 后端 → DB → API/曲线 → 下发命令 → ACK）。
> 时序/并发/阻塞规则看：[[实时规则]]；日志与排障建议配套看：[[日志规范]]、[[错误码与故障字典]]。

## 0）范围与非目标

### 范围（P0 必须覆盖）

- 串口二进制协议（含 CRC、重同步、错误码）
- MQTT topic 规范（telemetry/cmd/ack/log）
- 命令幂等（`cmd_id`）与 ACK 语义
- 后端 API 合约（命令下发/状态查询/遥测查询）
- DB schema（telemetry/commands）与索引建议
- 统一超时/重试默认值（网关与后端）

### 非目标（P0 不在主线做）

- TLS/证书体系、MQTT over TLS
- OTA/固件签名
- ROS2、导航、边缘 AI

---

## 1）统一命名与标识（必须全链路一致）

### 1.1 `device_id`

- 格式：`{board}-{nnn}`，例：`f411-001`、`f103-001`
- 规则：只用小写字母、数字、短横线；长度 ≤ 32
- 作用：MQTT topic、DB 主键、API 路径参数统一使用 `device_id`

### 1.2 `telemetry_seq`

- 类型：`uint32`
- 生成方：设备（MCU）
- 语义：每发一条遥测递增 1；设备重启可归零（允许回绕）
- 用途：丢包检测与排障（不是幂等键）

### 1.3 `cmd_id`

- 类型：`uint32`
- 生成方：后端（每个 `device_id` 单调递增即可）
- 语义：命令的**幂等键**；同一个 `cmd_id` 的命令无论被投递多少次，都不能被重复执行
- 用途：串口帧、MQTT、DB、API 必须能用 `cmd_id` 一次定位到整条链路

---

## 2）串口二进制协议（STM32 ↔ 网关）

### 2.1 基本原则（实时/并发规则）

- ISR **只做入队**（写 ring buffer），不做解析/业务
- 解析、CRC、命令执行全部在主循环/任务上下文完成
- 串口链路只传**二进制帧**（不混杂人类可读日志）；需要日志用 `LOG` 帧或另开调试口

### 2.2 帧格式（v1）

字节序：除特别说明外，多字节字段均为 **little-endian**。

| 字段 | 长度 | 说明 |
| --- | ---: | --- |
| `SOF` | 2 | 固定 `0xAA 0x55` |
| `VER` | 1 | 固定 `0x01` |
| `TYPE` | 1 | 消息类型（见下） |
| `FLAGS` | 1 | 预留（v1 固定 `0x00`） |
| `RESV` | 1 | 预留（v1 固定 `0x00`） |
| `ID` | 4 | `telemetry_seq` 或 `cmd_id`（随 TYPE 解释） |
| `LEN` | 2 | payload 长度（0..`MAX_PAYLOAD`） |
| `PAYLOAD` | LEN | 载荷 |
| `CRC16` | 2 | 对 `VER..PAYLOAD` 计算 CRC16 |

约束：

- `MAX_PAYLOAD = 256`（v1 固定，后续需要增大再升协议版本）
- 单帧最大长度：`2 + 1 + 1 + 1 + 1 + 4 + 2 + 256 + 2 = 270 bytes`

### 2.3 CRC16 约定

- 算法：CRC-16/CCITT-FALSE
- 参数：poly `0x1021`、init `0xFFFF`、xorout `0x0000`、refin=false、refout=false

> 你可以换 CRC 方案，但必须在 v1 里钉死；一旦上线不要私自更改（会导致三端不兼容）。

### 2.4 TYPE 枚举

- `0x01`：`TELEMETRY`（ID = `telemetry_seq`）
- `0x10`：`CMD`（ID = `cmd_id`）
- `0x11`：`ACK`（ID = `cmd_id`）
- `0x20`：`LOG`（ID = 0 或递增均可）

### 2.5 Payload 定义

#### 2.5.1 TELEMETRY payload（v1）

| 字段 | 类型 | 单位/说明 |
| --- | --- | --- |
| `uptime_ms` | `uint32` | 设备启动后毫秒数 |
| `temp_c_x100` | `int16` | 温度（°C × 100）；无传感器可用 mock |
| `hum_pct_x100` | `uint16` | 相对湿度（% × 100）；无传感器可用 mock |
| `press_pa` | `uint32` | 压强（Pa）；无传感器可用 0 |
| `vbat_mv` | `uint16` | 电池/供电电压（mV）；没有就填 0 |
| `dev_flags` | `uint16` | 位标志（例如：bit0=ONLINE，bit1=ERROR） |

#### 2.5.2 CMD payload（v1）

统一使用“命令码 + 32 位参数”：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `cmd` | `uint8` | 命令码（见下） |
| `arg0` | `int32` | 参数（含义随 cmd 变化） |
| `arg1` | `int32` | 参数（可选，未用填 0） |

命令码建议（P0 最小集合）：

- `0x01`：`SET_LED`（`arg0`: 0/1）
- `0x02`：`SET_PWM_DUTY`（`arg0`: 0..100）
- `0x03`：`SET_TELEMETRY_RATE_MS`（`arg0`: 周期 ms，建议 200..5000）
- `0x7F`：`PING`（用于链路自检）

#### 2.5.3 ACK payload（v1）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `status` | `uint8` | 0=OK，1=ERROR，2=DUPLICATE |
| `err_code` | `uint16` | 错误码（见下，OK 时为 0） |
| `uptime_ms` | `uint32` | 设备 uptime（便于排障） |

#### 2.5.4 LOG payload（v1，可选）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `level` | `uint8` | 10=DEBUG，20=INFO，30=WARN，40=ERROR |
| `msg` | `bytes` | UTF-8 文本（长度 ≤ 200） |

### 2.6 错误码表（v1）

固件与网关/后端需要共享同一份错误码含义（至少在 docs 中一致）：

- `0x0001`：BAD_CRC
- `0x0002`：BAD_LEN
- `0x0003`：UNKNOWN_TYPE
- `0x0101`：UNKNOWN_CMD
- `0x0102`：ARG_OUT_OF_RANGE
- `0x0201`：SENSOR_READ_FAIL
- `0x0202`：I2C_BUS_ERROR

### 2.7 重同步（resync）规则（v1）

- 解析状态机只要发现 CRC/LEN 不合法：丢弃当前帧，并在输入流里继续搜索 `SOF=0xAA55`
- 为避免卡死：每次失败至少消耗 1 字节，确保 forward progress

### 2.8 Ring buffer 容量建议（经验约束）

- 115200 波特率下约 `11.5 KB/s`
- 目标：主循环即使被阻塞 `100ms` 也不丢数据
- 建议：RX ring buffer ≥ `2048 bytes`（更稳用 4096）

---

## 3）命令幂等、超时与重试（必须三端一致）

### 3.1 幂等（idempotency）

- `cmd_id` 是唯一幂等键
- 设备端必须维护一个“已执行命令集合”（建议保存最近 32 个 `cmd_id`）
- **重复到达处理**：
  - 不重复执行
  - 必须返回 `ACK(status=DUPLICATE)` 或 `ACK(status=OK)`（二选一，但必须钉死；v1 推荐 `DUPLICATE` 便于观测）

### 3.2 超时与重试（默认值）

默认参数（可在后端/网关配置文件覆盖，但默认值应一致）：

- 网关串口等待 ACK 超时：`1s`
- 网关串口重试次数：`2`（总共尝试 3 次）
- 后端命令状态超时（未收到 ACK）：`10s`（超过标为 TIMEOUT）

---

## 4）MQTT 规范（网关 ↔ 云端）

### 4.1 Topics（v1 固定）

- 遥测上报：`devices/{device_id}/telemetry`
- 云端下发命令：`devices/{device_id}/cmd`
- 设备 ACK：`devices/{device_id}/ack`
- 设备日志（可选）：`devices/{device_id}/log`

### 4.2 QoS/retain/LWT（默认建议）

- `telemetry`：QoS 0（数据量大、允许丢少量）
- `cmd`：QoS 1（需要“至少一次”投递，靠幂等保证不重复执行）
- `ack`：QoS 1（同上）
- retain：默认不 retain；如果你想让新订阅者拿到最后状态，可对“在线状态/最后心跳”单独做 retain topic
- LWT（可选）：网关可以发布 `devices/{id}/status` 的离线消息（retain），作为平台体验加分项

### 4.3 MQTT JSON 载荷（v1）

#### telemetry JSON（网关发布）

```json
{
  "device_id": "f411-001",
  "host_ts_ms": 1730000000000,
  "telemetry_seq": 42,
  "uptime_ms": 123456,
  "metrics": { "temp_c": 25.34, "hum_pct": 41.2, "press_pa": 100812, "vbat_mv": 0 },
  "dev_flags": 1
}
```

#### cmd JSON（后端发布）

```json
{
  "device_id": "f411-001",
  "cmd_id": 1001,
  "cmd": "set_led",
  "params": { "value": 1 },
  "ts_ms": 1730000001000
}
```

#### ack JSON（网关发布）

```json
{
  "device_id": "f411-001",
  "cmd_id": 1001,
  "status": "ok",
  "err_code": 0,
  "uptime_ms": 124000,
  "ts_ms": 1730000001200
}
```

> JSON 字段可以扩展，但不要改名/改语义；新增字段必须保持向后兼容。

---

## 5）后端 API 合约（v1 最小集合）

### 5.1 `GET /health`

- 200 表示服务可用

### 5.2 `GET /devices`

- 返回 device 列表（从 DB distinct）

### 5.3 `GET /devices/{device_id}/telemetry`

- query：`from_ts_ms`、`to_ts_ms`、`limit`
- 返回按时间排序的数组

### 5.4 `POST /devices/{device_id}/commands`

请求（示例）：

```json
{ "cmd": "set_led", "params": { "value": 1 } }
```

响应（示例）：

```json
{ "device_id": "f411-001", "cmd_id": 1001, "status": "sent" }
```

### 5.5 `GET /devices/{device_id}/commands/{cmd_id}`

返回命令状态与 ACK 信息。

---

## 6）DB schema（v1 建议）

### 6.1 telemetry 表

- `device_id`（text）
- `host_ts_ms`（bigint）
- `telemetry_seq`（int）
- `uptime_ms`（bigint）
- `temp_c`（real）
- `hum_pct`（real）
- `press_pa`（int）
- `vbat_mv`（int）
- `dev_flags`（int）

索引建议：

- `(device_id, host_ts_ms DESC)`
- 可选：`(device_id, telemetry_seq)`（便于排障/检测跳变）

### 6.2 commands 表

- `device_id`（text）
- `cmd_id`（int）
- `cmd`（text）
- `params`（jsonb）
- `status`（text：CREATED/SENT/ACKED/TIMEOUT/FAILED）
- `created_ts_ms`（bigint）
- `sent_ts_ms`（bigint）
- `ack_ts_ms`（bigint）
- `ack_status`（text：ok/error/duplicate）
- `err_code`（int）

主键建议：

- `(device_id, cmd_id)`

---

## 7）改动规则（避免规格漂移）

- 任何字段/命名/语义的改动，必须先改本页，再改三端实现
- 破坏性变更必须 bump `VER`，并在 `CHANGELOG` 写清迁移方案
