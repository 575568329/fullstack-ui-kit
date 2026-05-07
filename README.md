# fullstack-ui-kit

React + TypeScript 组件库，聚焦 AI 应用、RAG 工作台、Agent 执行过程和前端复杂状态抽象。

## 安装

```bash
npm install fullstack-ui-kit
```

## 定位

这个库不是通用 UI 大而全方案，而是面向以下场景的组件沉淀：

- AI 对话展示
- RAG 来源引用
- Agent 执行步骤
- 文件上传和流式输出
- 错误恢复和异步状态

## 当前组件

- `ChatMessage`
- `CitationList`
- `SourceCard`
- `SourceGroupPanel`
- `StreamingText`
- `StepTimeline`
- `UploadPanel`

## 使用

```tsx
import { ChatMessage, CitationList, StreamingText } from 'fullstack-ui-kit'
import type { ChatMessageItem, CitationItem } from 'fullstack-ui-kit'

const message: ChatMessageItem = {
  id: 'msg-1',
  role: 'assistant',
  content: '已命中 3 条来源，准备生成带引用的回答。',
  status: 'final',
}

const citations: CitationItem[] = [
  {
    id: 'citation-1',
    index: 1,
    filename: 'rag-architecture.md',
    heading: 'Retrieval Pipeline',
    score: 0.94,
  },
]

export function Demo() {
  return (
    <>
      <ChatMessage message={message} />
      <StreamingText text="正在检索相关文档并生成回答" status="streaming" />
      <CitationList items={citations} />
    </>
  )
}
```

## 本地运行

```bash
npm install
npm run dev
```

## 组件说明

- `ChatMessage`：用于展示用户、助手和工具消息。
- `CitationList`：用于展示回答末尾的引用列表。
- `SourceCard`：用于展示单条来源卡片。
- `SourceGroupPanel`：用于展示按文件聚合后的来源面板。
- `StreamingText`：用于展示流式生成中的文本状态。
- `StepTimeline`：用于展示任务步骤和状态。
- `UploadPanel`：用于展示上传文件状态和重试入口。

## 设计原则

1. 组件优先服务真实业务场景。
2. 优先抽高频、难讲清楚、可复用的交互。
3. 普通基础控件只保留最小能力，不作为主卖点。
