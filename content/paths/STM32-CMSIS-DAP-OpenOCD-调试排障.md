---
title: STM32 调试排障：CMSIS-DAP + OpenOCD（macOS / VS Code）
draft: false
stage: budding
---

# STM32 调试排障（CMSIS-DAP + OpenOCD）

这页的目标不是教你“装插件”，而是把问题快速定位到一层：**硬件/探针/工具链/配置**。  
只要命令行能连上，VS Code 一定只是配置问题。

> 你现在用的是 CMSIS-DAP（普中玄武板 + CMSIS-DAP 在线调试）。本页默认该路径。

## 0）10 分钟止血排障（优先级从高到低）

### Step A：释放设备占用

- 退出 CubeIDE（以及任何可能占用调试器/串口的软件）
- 拔插探针/USB 线

### Step B：先用命令行启动 OpenOCD

你需要一个可复用的 `openocd.cfg`（建议放到项目里，比如 `debug/openocd.cfg`）。

最小示例（根据你的芯片换 target）：

```bash
openocd -f interface/cmsis-dap.cfg -f target/stm32f1x.cfg -d2
```

你期望看到：

- 识别到 CMSIS-DAP / DAPLink
- 找到 STM32 target
- 监听 `3333` 端口

常见错误与含义：

- `Can't find interface/cmsis-dap.cfg`：OpenOCD scripts 路径不对（你用的不是带 scripts 的那套 OpenOCD）
- `unable to open CMSIS-DAP device`：设备被占用/权限/连线/供电/频率太高

### Step C：再用 GDB 连接（验证链路）

```bash
arm-none-eabi-gdb build/your.elf
(gdb) target extended-remote :3333
(gdb) monitor reset halt
(gdb) load
(gdb) continue
```

- 能 `load` 并跑起来：硬件/探针 OK，VS Code 只是配置问题
- `reset halt` 卡住：多半是 reset 策略/NRST/时序问题（见下方“坑位”）

---

## 1）VS Code 推荐方案（最稳）

推荐组合：

- CubeMX/CubeIDE 生成工程（或你自己的 Make/CMake）
- VS Code 写代码/构建
- **Cortex-Debug** 负责调试（OpenOCD/pyOCD）

关键原则：

- VS Code 必须使用**同一套**可工作的 OpenOCD + GDB（避免“版本不一致”）
- 如果你在 CubeIDE 能调通：优先复用 CubeIDE 自带的 OpenOCD/GDB 路径

---

## 2）最常见的 5 个坑（对照排）

1) OpenOCD scripts 路径错  
表现：找不到 `interface/...` 或 `target/...`  
解决：确认你运行的 openocd 带 scripts；或显式设置 `-s <scripts_dir>`

2) 设备被占用  
表现：`unable to open CMSIS-DAP device`  
解决：退出 CubeIDE；拔插；必要时重启

3) 速度/线材/供电导致偶发失败  
解决：先降速稳定优先，例如在 cfg 里设置较低 `adapter speed`；线尽量短、GND 可靠

4) reset 策略不匹配（尤其是没接 NRST）  
解决：换 reset 配置（`srst_only`/`srst_nogate`/`none`），并尝试 “connect under reset”

5) 程序把 SWD 关掉  
表现：烧录后再也连不上  
解决：确保代码不把 SWD 引脚当普通 GPIO；必要时“connect under reset”抢占调试
