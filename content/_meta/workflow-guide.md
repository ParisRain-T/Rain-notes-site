---
title: 工作流指南
publish: false
---

# Obsidian → 博客 工作流指南

> 这是一份私有指南，帮助你建立从 Obsidian 到博客的发布流程。

## 你的 Obsidian 结构

```
📂 Obsidian Vault
├── 📁 收集/          # Inbox - 快速捕捉
├── 📁 生活/          # 生活记录
├── 📁 工作/          # 项目、实习相关
├── 📁 学习/          # 技术学习笔记
└── 📁 dailynotes/    # 每日记录
```

## 映射到博客

| Obsidian | → 博客 | 说明 |
|----------|--------|------|
| 学习/ | notes/iot, notes/embedded... | 技术知识卡片 |
| 工作/（项目部分） | projects/ | 完整项目展示 |
| 学习/（深度整理） | posts/ | 长文、教程 |
| dailynotes/（精选） | til/ | 每日所学 |

## 发布流程

### 1. 在 Obsidian 笔记中标记

```yaml
---
title: "MQTT 入门"
publish: true          # 标记为可发布
blog_path: notes/iot   # 发布位置
---
```

### 2. 复制到博客

1. 打开标记了 `publish: true` 的笔记
2. 复制到博客对应目录
3. 检查链接和图片路径
4. 运行 `npx quartz build` 验证

### 3. 发布检查清单

- [ ] frontmatter 完整
- [ ] 图片放在正确位置
- [ ] 内部链接有效
- [ ] 本地构建无错误

## 每周复盘

每周日 30 分钟：

1. 回顾 dailynotes → 精选到 til/
2. 检查 学习/ → 发布到 notes/
3. 检查 工作/ → 更新 projects/
4. 更新 now.md

## NotebookLM 使用

### IoT 知识库（优先创建）

上传这些内容：
- 学习/ 中的 IoT、嵌入式笔记
- 技术书籍 PDF
- 重要技术文章

用于：
- 复习知识点
- 准备面试
- 生成学习材料
