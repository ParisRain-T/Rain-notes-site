---
title: EdgeGarden 运行指南
publish: true
---

# 如何运行 EdgeGarden

> 从零开始，让项目在你的环境跑起来

## 前置条件

### 硬件

- [ ] ESP32 开发板
- [ ] DHT11/DHT22 温湿度传感器
- [ ] 土壤湿度传感器
- [ ] 连接线若干

### 软件

- [ ] PlatformIO 或 Arduino IDE
- [ ] Go 1.21+
- [ ] Docker & Docker Compose（可选，用于部署）
- [ ] 阿里云 IoT 账号（或其他 MQTT Broker）

## 快速开始

### Step 1：克隆仓库

```bash
git clone https://github.com/ParisRain-T/EdgeGarden.git
cd EdgeGarden
```

### Step 2：配置设备端

1. 打开 `device/` 目录
2. 复制 `config.example.h` 为 `config.h`
3. 填入 WiFi 和 MQTT 配置
4. 烧录到 ESP32

### Step 3：启动后端服务

```bash
cd backend/
go mod download
go run main.go
```

### Step 4：查看数据

访问 `http://localhost:8080` 查看仪表盘

## 常见问题

### Q: 设备连不上 WiFi？

检查 `config.h` 中的 SSID 和密码是否正确。

### Q: MQTT 连接失败？

确认 Broker 地址、端口、用户名密码是否填写正确。

---

> 遇到问题？欢迎在 GitHub Issue 中反馈！
