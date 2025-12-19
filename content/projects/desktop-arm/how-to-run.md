---
title: 桌面机械臂运行指南
draft: false
---

> 如何在本地运行项目（目录结构可能随仓库迭代调整）

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

- 选择正确串口与波特率
- 执行关节初始化/归零指令
- 先单关节测试，再进行联动动作

## 常见问题

### Q: 舵机抖动？

可能原因：
1. 电源电流不足
2. PWM 信号不稳定

### Q: 运动不平滑？

可能原因：
1. 加速度/速度曲线过陡
2. 结构件松动或存在背隙
3. 电源供电不足导致力矩不足

---

> 更新时间：2025-12-16
