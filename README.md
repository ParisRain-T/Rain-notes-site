# Rain Notes Site

个人数字花园（Quartz 4）。内容在 `content/`，官方文档在 `docs/`。

## 本地开发

```bash
npm install
npx quartz build --serve
```

访问 `http://localhost:8080` 预览。

## 目录结构

- `content/`：站点内容
- `docs/`：Quartz 官方文档
- `quartz.config.ts`：站点配置
- `quartz.layout.ts`：页面布局

## 构建发布

```bash
npx quartz build
```
