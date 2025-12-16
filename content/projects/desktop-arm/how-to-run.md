---
title: 桌面机械臂运行指南
publish: true
---

> 如何在本地运行项目

## 前置条件

### 硬件

- [ ] 组装好的机械臂
- [ ] USB 数据线
- [ ] 5V 电源（至少 3A）

### 软件

- [ ] Arduino IDE 或 PlatformIO
- [ ] Python 3.8+（上位机）
- [ ] 串口驱动

## 快速开始

### Step 1：克隆仓库

```bash
git clone https://github.com/ParisRain-T/desktop-arm.git
cd desktop-arm
```

### Step 2：烧录固件

```bash
cd firmware/
# 使用 PlatformIO 或 Arduino IDE 烧录
```

### Step 3：安装上位机依赖

```bash
cd upper/
pip install -r requirements.txt
```

### Step 4：运行上位机

```bash
python main.py
```

### Step 5：连接测试

*待补充：串口选择、初始化步骤*

## 常见问题

### Q: 舵机抖动？

可能原因：
1. 电源电流不足
2. PWM 信号不稳定

### Q: 运动不平滑？

*待补充*

---

> 更新时间：2025-12-16
