import { useMemo, useState } from 'react'
import { ChatMessage } from './components/ChatMessage'
import { SourceCard } from './components/SourceCard'
import { StepTimeline } from './components/StepTimeline'
import { UploadPanel } from './components/UploadPanel'
import type { ChatMessageItem } from './components/ChatMessage/types'
import type { SourceCardItem } from './components/SourceCard/types'
import type { StepItem } from './components/StepTimeline/types'
import type { UploadFileItem } from './components/UploadPanel/types'

const initialChat: ChatMessageItem[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: '帮我总结这个知识库里和向量检索有关的内容。',
    timestamp: '10:21',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content:
      '可以，我会先检索文档片段，再把相关来源和结论一起返回，保证回答可追溯。',
    timestamp: '10:21',
    status: 'final',
  },
]

const initialSources: SourceCardItem[] = [
  {
    id: 'src-1',
    title: 'rag-workflow.md',
    excerpt: '上传 -> 切片 -> embedding -> 检索 -> 组装 prompt -> 流式输出',
    score: 0.92,
    location: 'L18-L32',
    tags: ['RAG', '检索'],
  },
  {
    id: 'src-2',
    title: 'agent-trace.md',
    excerpt: '工具调用需要可视化执行步骤，便于面试时讲清楚链路。',
    score: 0.84,
    location: 'L11-L19',
    tags: ['Agent', 'Trace'],
  },
]

const initialSteps: StepItem[] = [
  {
    id: 'step-1',
    title: '解析上传文件',
    description: '读取文件并提取文本内容。',
    status: 'success',
  },
  {
    id: 'step-2',
    title: '生成向量',
    description: '对切片内容调用 embedding 模型。',
    status: 'running',
  },
  {
    id: 'step-3',
    title: '检索并组装上下文',
    description: '按 query 匹配候选片段并准备 prompt。',
    status: 'pending',
  },
]

const initialFiles: UploadFileItem[] = [
  {
    id: 'file-1',
    name: 'rag-workflow.md',
    sizeLabel: '24 KB',
    status: 'uploaded',
  },
  {
    id: 'file-2',
    name: 'agent-trace.md',
    sizeLabel: '18 KB',
    status: 'processing',
    progress: 68,
  },
  {
    id: 'file-3',
    name: 'error-log.md',
    sizeLabel: '9 KB',
    status: 'error',
    errorMessage: 'Chunk parse failed at line 41',
  },
]

function App() {
  const [messages] = useState(initialChat)
  const [sources] = useState(initialSources)
  const [steps] = useState(initialSteps)
  const [files] = useState(initialFiles)

  const metrics = useMemo(
    () => [
      { label: '场景定位', value: 'AI / RAG / Agent' },
      { label: '组件策略', value: '从真实项目抽象' },
      { label: '主卖点', value: '复杂状态与可追溯链路' },
    ],
    [],
  )

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">fullstack-ui-kit</p>
          <h1>面向 AI 场景和复杂前端状态的组件库</h1>
          <p className="hero__desc">
            不是通用 UI 大而全，而是把真实项目里最值得讲的交互沉淀成可复用组件。
          </p>
        </div>
        <div className="hero__metrics">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="grid">
        <div className="panel panel--chat">
          <div className="panel__header">
            <h2>ChatMessage</h2>
            <span>AI 对话展示</span>
          </div>
          <div className="stack">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel__header">
            <h2>SourceCard</h2>
            <span>RAG 来源引用</span>
          </div>
          <div className="stack">
            {sources.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel__header">
            <h2>StepTimeline</h2>
            <span>Agent 执行步骤</span>
          </div>
          <StepTimeline steps={steps} />
        </div>

        <div className="panel">
          <div className="panel__header">
            <h2>UploadPanel</h2>
            <span>文件上传与状态</span>
          </div>
          <UploadPanel
            files={files}
            onRetry={(fileId) => {
              console.info('retry upload', fileId)
            }}
          />
        </div>
      </section>
    </main>
  )
}

export default App
