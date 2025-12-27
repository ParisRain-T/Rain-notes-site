---
title: CI 最小闭环：自动化把质量“锁住”
draft: false
stage: budding
---

# CI 最小闭环（让你越改越稳）

CI 的目的不是“看起来很工程化”，而是把你最容易踩的坑自动拦住：

- 协议实现改坏了（CRC/parser/ringbuffer）→ 立刻失败
- 后端/API 合约漂了（字段改名/语义变）→ 立刻失败
- 代码风格与静态检查不一致 → 立刻失败

> 测试分层建议见 [[测试体系]]。CI 只跑“最快、最有收益”的那部分。

## 1）CI 的最小目标（DoD）

每次 push / PR 至少做到：

- Python：lint + unit tests 通过
- 协议：主机侧单测通过（不依赖硬件）
- 后端：API contract（Pydantic 模型）与基础接口 smoke test 通过

可选（后期再加）：

- 固件编译检查（需要 arm 工具链，复杂度更高）
- E2E（需要设备/串口，不适合每次跑）

## 2）推荐的流水线结构（先快后慢）

### 2.1 快速检查（每次 PR 必跑）

- `lint`：ruff/black（或你选的工具）
- `unit`：pytest（协议/网关/后端的单测）
- `type`（可选）：mypy（后端/网关）

### 2.2 中等检查（合并到 main 时跑）

- 合同测试：检查 MQTT JSON schema、API response schema
- 数据库迁移/建表测试（如果你用 Alembic）

### 2.3 慢检查（定时 nightly 或手动触发）

- 故障注入脚本（断网/broker 重启/后端重启）
- 24h 长跑（输出稳定性报告）

## 3）实用约定（让 CI 不折磨人）

- CI 只跑“主机可跑”的测试：不依赖串口、不开 GUI
- 单测要有“黄金向量”（固定输入→固定输出），避免 flaky
- E2E 只在你本机跑（或未来有硬件 runner 再上）

## 4）样例：GitHub Actions 你可以怎么写（概念模板）

下面是一个“思路模板”（你可以按你的实际目录调整）。注意：这是说明文档，不保证可直接复制即用。

```yaml
name: ci
on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - run: ruff check .
      - run: pytest -q
```

## 5）把 CI 和 Gate 绑定（你会更自律）

建议你在 [[执行路径]] 的每个 Gate 里写一句：

- “本周交付必须让 CI 通过，否则不算 Pass”

这样你不会把质量债拖到最后一起爆。
