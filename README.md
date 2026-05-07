# fullstack-ui-kit

React + TypeScript 组件库，聚焦 AI 应用、RAG 工作台、Agent 执行过程和前端复杂状态抽象。

## 定位

这个库不是通用 UI 大而全方案，而是面向以下场景的组件沉淀：

- AI 对话展示
- RAG 来源引用
- Agent 执行步骤
- 文件上传和流式输出
- 错误恢复和异步状态

## 当前组件

- `ChatMessage`
- `SourceCard`
- `StepTimeline`
- `UploadPanel`

## 本地运行

```bash
npm install
npm run dev
```

## 设计原则

1. 组件优先服务真实业务场景。
2. 优先抽高频、难讲清楚、可复用的交互。
3. 普通基础控件只保留最小能力，不作为主卖点。
