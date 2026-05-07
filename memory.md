# fullstack-ui-kit 项目记忆

最后更新：2026-05-07

## 项目定位

`fullstack-ui-kit` 是一个独立的 React + TypeScript 组件库，重点不是通用 UI 大而全方案，而是沉淀 AI 应用、RAG 工作台、Agent 执行过程和复杂前端状态相关组件。

当前仓库既承担 npm 发布源码，也承担本地可浏览的组件演示站。

## 当前阶段

- npm 发布真源：`D:\Study\fullstack-ui-kit`
- 本地演示方式：`npm run dev` 打开浏览组件页面
- 演示站风格：左侧目录 + 右侧分区示例
- 默认端口：`3000`
- 预览端口：`3001`

## 当前已实现组件

- `ChatMessage`
- `SourceCard`
- `StepTimeline`
- `UploadPanel`

## 当前演示内容

首页是一个本地组件演示站，不部署，只在本机浏览。页面展示：

- 目录导航
- 项目概览
- 每个组件的作用说明
- 每个组件的实时示例

## 设计边界

- 不把它做成通用 UI 大而全库。
- 普通组件只保留最小能力，不作为主卖点。
- 优先补 AI / RAG / Agent / 异步状态 / 上传重试 / 流式展示类组件。

## 下一步建议

1. 补 `StreamingText`。
2. 补 `ErrorStatePanel`。
3. 补 `RetryNotice`。
4. 补 `ConversationHistoryPanel`。
5. 继续整理 README 和面试可讲说明。

## 备注

- 独立仓库已绑定 `git@github.com:575568329/fullstack-ui-kit.git`。
- 需要记住当前页面标题是中性表述 `组件演示站`，不再使用 ElementUI 类比文案。
