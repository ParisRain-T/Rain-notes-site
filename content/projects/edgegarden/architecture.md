---
title: EdgeGarden 架构
---

# EdgeGarden 架构

> 这页建议写到「别人 5 分钟能看懂」，并能回答：有哪些组件？怎么通信？关键数据怎么流？怎么部署？怎么观测？

## 组件划分（示例）

- 客户端：`Web / App / 设备`
- 服务端：`API / Worker / 定时任务`
- 存储：`DB / Cache / Object Storage`
- 可观测：`Log / Metrics / Trace`

## 关键流程（示例）

1. `用户/设备` 发起请求
2. `API` 校验权限与参数
3. `Worker` 异步处理任务
4. `DB` 持久化，`Cache` 加速热点读取

## 部署（示例）

- 环境：`dev / staging / prod`
- 方式：`Docker / k8s / PaaS`
- CI/CD：`构建 -> 测试 -> 发布`

