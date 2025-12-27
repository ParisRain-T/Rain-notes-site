---
title: DoD 清单：版本交付的最低通过线（P0/P1）
draft: false
stage: budding
---

# DoD 清单（Definition of Done）

DoD 不是“待办清单”，而是“**这一版交付到什么程度才算真的完成**”。  
你做长期路线最容易掉进的坑是：每周都在“做事”，但没有稳定的“过关线”，导致版本越迭代越混乱。

> 协议/Topic/API/DB 的单一真相：[[P0_SPEC_v1]]  
> 证据留存与测试分层：[[测试体系]]  
> 可观测与链路追踪：[[日志规范]]  
> 快速复现的交付底线：[[新机器10分钟复现清单]]

---

## 0）通用 DoD（所有版本都必须满足）

- 能演示：至少 1 个“从启动到结果”的演示路径（可录屏）
- 能验收：有脚本/命令能给出 PASS/FAIL（不是目测）
- 能定位：失败时日志能指出断在 MCU / 网关 / MQTT / 后端 / DB 哪一段
- 能复现：换一台电脑能在限定时间内跑起来（见 [[新机器10分钟复现清单]]）

证据最小集合（建议每次 Gate/版本都留）：

- `scripts/` 输出（含统计）
- `logs/`（原始串口流 / gateway / backend）
- 1 张架构图或数据流图（版本迭代时更新）
- 3–5 次“有意义提交”（commit 信息能说明改了什么）

---

## 1）P0 DoD（端到云闭环底座）

### P0 v0.1：串口遥测 + 本地解析（不碰 MQTT）

- 固件：以固定频率输出 TELEMETRY 帧（无传感器允许 mock）
- 主机侧：能抓取原始串口流并解析为结构体/JSON
- 稳定性：连续运行 ≥ 30min 无死机、无卡死
- 证据：保存一段 `logs/serial.raw` + 解析输出样例

### P0 v0.3：协议 v1 + CMD/ACK（串口闭环）

- 协议：CRC16 + parser 状态机 + 重同步（以 [[P0_SPEC_v1]] 为准）
- 命令：至少支持 `SET_LED`，并返回 ACK
- 幂等：同一 `cmd_id` 重复到达不重复执行
- 指标：串口发命令 1000 次，ACK 成功率 ≥ 99%
- 证据：`scripts/test_serial_protocol.py`（或同等脚本）输出 PASS

### P0 v0.5：网关 + MQTT 上行

- 网关：串口 TELEMETRY → MQTT publish（topic 按 [[P0_SPEC_v1]]）
- 指标：telemetry 稳定上报 ≥ 1h；掉线能自动重连（有日志证据）
- 证据：`scripts/test_mqtt_ingest.py`（或 `mosquitto_sub` + 统计脚本）与日志

### P0 v0.7：后端 + DB 入库 + 查询 API

- 一键启动：`docker compose up -d` 可启动 broker/backend/db
- 入库：telemetry 进入 DB，行数可增长
- API：至少提供 `GET /health`、`GET /devices`、`GET /devices/{id}/telemetry`
- 证据：`scripts/test_api_smoke.py` 输出 PASS + 1 张曲线/查询截图

### P0 v0.9：下行命令 API + 全链路 ACK 入库

- API：`POST /devices/{id}/commands` 能下发命令
- 链路：API → MQTT → 网关 → 串口 → MCU 执行 → ACK → MQTT → 后端入库
- 指标：端到端命令成功率 ≥ 95%（至少 200 次样本）
- 证据：`scripts/test_mqtt_roundtrip.py` + `scripts/test_api_commands.py`

### P0 v1.0：工程化定型（可投递版）

- 稳定性：连续运行 ≥ 24h（输出报告：掉线次数、重连耗时、失败比例）
- 测试分层：至少具备
  - 协议单测（encode/decode/CRC/parser）
  - 合同测试（MQTT JSON/API schema 的最小校验）
  - E2E 脚本（串口/MQTT/API）
- 故障注入：串口拔插、断网、broker 重启、后端重启均可恢复（见 [[测试体系]]）
- 文档：英文 README（Quickstart + Architecture + API + Protocol）
- 证据：Release tag（如 `v1.0`）+ demo 视频（2–4 分钟）+ 三脚本全 PASS

---

## 2）P1 DoD（智能小车升级：复用 P0 底座）

> P1 的规格与安全约束以 [[P1_SPEC_v0]] 为准（急停/超时刹车/限速/低电压保护）。

### P1 v0.4：云端遥控可用（安全占位必须先做）

- 车端：电机 PWM 能控，支持速度/转向命令（哪怕很粗糙）
- 安全：急停 + 命令超时自动刹车 + 限速（至少三选二先落地）
- 闭环：云端下发 → 执行 → ACK 可查（复用 P0 命令/ACK）
- 证据：1 次演示视频（30–60 秒也可）+ E2E 脚本能跑通

### P1 v0.7：速度闭环（编码器 + PID）

- 编码器：能读速度/里程
- 控制：目标速度可跟踪（输出误差统计）
- 遥测：至少上报 `v_target/v_meas/pwm`，能在云端查到
- 证据：直线跑 3m 的误差记录 + 曲线截图

### P1 v1.0：安全与可复现定型（可投递版）

- 安全：急停/超时刹车/限速/低电压保护全部具备
- 可靠性：关键命令成功率 ≥ 99%（定义样本与场景）
- 文档：英文 README + 故障字典补齐（至少 5 个典型故障）
- 证据：demo 视频（2–4 分钟）+ 可在他人机器复现（见 [[新机器10分钟复现清单]]）

