---
title: ESP32 开发环境搭建
draft: false
tags:
  - iot
  - esp32
  - embedded
---

# ESP32 开发环境搭建

> 目标：能把 ESP32 跑起来，并能连 Wi‑Fi、发出一条 MQTT 消息。

## 两种常见路线

- Arduino IDE：上手快，适合入门验证想法
- PlatformIO：工程化更好，适合长期维护

## 最小验收

- 能编译/烧录一个 `Blink`
- 能打印串口日志（能看到 IP、RSSI）
- 能连上一个 MQTT Broker，并 publish 一条消息

## 常见坑（先记住这几个）

- 串口芯片驱动（CH340/CP2102）与端口权限
- 供电不足导致“莫名其妙重启”
- Wi‑Fi 密码/2.4G 与 5G 频段
