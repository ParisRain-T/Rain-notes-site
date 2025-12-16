---
title: IoT 入门路径
publish: true
stage: budding
---

# IoT 入门：从零到跑通一个传感器项目

> 预计阅读时间：30 分钟（不含动手实践）

## 这条路径适合谁

- 想入门物联网但不知道从哪开始
- 有一点编程基础（C 或 Python）
- 想做一个能实际运行的小项目

## 学习目标

完成这条路径后，你将能够：
1. 理解 IoT 的基本架构（设备层 → 网络层 → 平台层 → 应用层）
2. 用 ESP32 读取传感器数据
3. 通过 MQTT 协议将数据发送到云平台
4. 在手机/网页上查看实时数据

---

## Step 1：理解 IoT 基础概念

> 先建立整体认知，再深入细节

**阅读内容：**
- [[notes/iot/index|IoT 笔记入口]] - 了解这个领域的知识框架

**核心问题：**
- IoT 系统由哪几层组成？
- 为什么需要 MQTT 而不是 HTTP？

---

## Step 2：认识硬件 - ESP32

> 动手之前，先认识你的工具

**阅读内容：**
- [[notes/embedded/index|嵌入式笔记入口]]

**核心问题：**
- ESP32 和 Arduino 有什么区别？
- ESP32 的 WiFi 和蓝牙能用来做什么？

---

## Step 3：理解 MQTT 协议

> IoT 领域最主流的通信协议

**阅读内容：**
- [[notes/iot/index|IoT 笔记]] 中关于 MQTT 的部分

**核心概念：**
- Broker / Publisher / Subscriber
- Topic 的设计规范
- QoS 等级的选择

---

## Step 4：看一个完整项目

> 把前面的知识串起来

**推荐查看：**
- [[projects/edgegarden/index|EdgeGarden 项目]]
- [[projects/edgegarden/architecture|EdgeGarden 架构]]

**关注点：**
- 数据从传感器到云平台的完整路径
- 每一层用了什么技术

---

## Step 5：动手实践

> 只有动手才是真的学会

**建议步骤：**
1. 购买一块 ESP32 开发板 + DHT11 温湿度传感器
2. 用 Arduino IDE 或 PlatformIO 写第一个程序
3. 连接 WiFi，发送数据到 MQTT Broker
4. 接入阿里云 IoT 或 EMQX 公共 Broker

---

## 完成后的下一步

- 尝试添加更多传感器
- 学习 FreeRTOS 实现多任务
- 了解 OTA 空中升级
- 探索边缘计算场景

---

> 这条路径会持续更新，欢迎提出建议！
