import { useMemo } from 'react'
import { ChatMessage } from './components/ChatMessage'
import { CitationList } from './components/CitationList'
import { SourceCard } from './components/SourceCard'
import { SourceGroupPanel } from './components/SourceGroupPanel'
import { StreamingText } from './components/StreamingText'
import { StepTimeline } from './components/StepTimeline'
import { UploadPanel } from './components/UploadPanel'
import type { ChatMessageItem } from './components/ChatMessage/types'
import type { CitationItem } from './components/CitationList/types'
import type { SourceCardItem } from './components/SourceCard/types'
import type { SourceGroupItem } from './components/SourceGroupPanel/types'
import type { StreamingStatus } from './components/StreamingText/types'
import type { StepItem } from './components/StepTimeline/types'
import type { UploadFileItem } from './components/UploadPanel/types'

type SectionId =
  | 'chat'
  | 'citation'
  | 'source'
  | 'source-group'
  | 'streaming'
  | 'timeline'
  | 'upload'

interface DocSection {
  id: SectionId
  title: string
  category: string
  summary: string
  description: string
  fieldTitle?: string
  usage: string[]
  notes: string[]
  props: Array<{
    name: string
    type: string
    required: boolean
    description: string
  }>
  fields?: Array<{
    name: string
    type: string
    required: boolean
    description: string
  }>
}

const chatMessages: ChatMessageItem[] = [
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
  {
    id: 'msg-3',
    role: 'tool',
    content: '已命中 3 条来源，准备生成带引用的回答。',
    timestamp: '10:22',
  },
]

const sourceCards: SourceCardItem[] = [
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

const sourceGroups: SourceGroupItem[] = [
  {
    id: 'group-1',
    filename: 'rag-architecture.md',
    score: 0.94,
    knowledgeBaseName: '研发知识库',
    downloadUrl: 'https://example.com/download/rag-architecture.md',
  },
  {
    id: 'group-2',
    filename: 'handover-notes.pdf',
    score: 0.87,
    knowledgeBaseName: '项目交接文档',
  },
  {
    id: 'group-3',
    filename: 'ops-playbook.docx',
    score: 0.79,
    downloadUrl: 'https://example.com/download/ops-playbook.docx',
  },
]

const citations: CitationItem[] = [
  {
    id: 'citation-1',
    index: 1,
    filename: 'rag-architecture.md',
    heading: '2.3 Retrieval Pipeline',
    score: 0.94,
    knowledgeBaseName: '研发知识库',
  },
  {
    id: 'citation-2',
    index: 2,
    filename: 'handover-notes.pdf',
    heading: 'Chunking Strategy',
    score: 0.87,
    knowledgeBaseName: '项目交接文档',
  },
  {
    id: 'citation-3',
    index: 3,
    filename: 'ops-playbook.docx',
    heading: 'FAQ / Re-index',
    score: 0.79,
  },
]

const timelineSteps: StepItem[] = [
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

const streamingStates: Array<{
  id: string
  title: string
  status: StreamingStatus
  text: string
  placeholder?: string
  errorMessage?: string
}> = [
  {
    id: 'stream-idle',
    title: 'idle',
    status: 'idle',
    text: '',
    placeholder: '等待模型开始输出...',
  },
  {
    id: 'stream-streaming',
    title: 'streaming',
    status: 'streaming',
    text: '正在检索相关文档并生成回答',
  },
  {
    id: 'stream-paused',
    title: 'paused',
    status: 'paused',
    text: '已生成第一段结果，等待继续。',
  },
  {
    id: 'stream-completed',
    title: 'completed',
    status: 'completed',
    text: '检索完成，共命中 3 个来源，并已生成最终总结。',
  },
  {
    id: 'stream-error',
    title: 'error',
    status: 'error',
    text: '已收到部分文本。',
    errorMessage: '网络异常，输出中断。',
  },
]

const uploadFiles: UploadFileItem[] = [
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

const sections: DocSection[] = [
  {
    id: 'chat',
    title: 'ChatMessage',
    category: '对话展示',
    summary: '用于展示用户、助手和工具消息，适合问答流、流式输出、对话历史。',
    description:
      '这个组件把消息角色、状态和时间戳统一收口，适合直接放在聊天窗口或回答区中使用。',
    fieldTitle: 'message 字段说明',
    usage: [
      '传入单条 `message` 对象。',
      '通过 `role` 区分用户、助手和工具消息。',
      '可用 `status` 标记流式、最终或错误状态。',
    ],
    notes: [
      '内容支持换行显示。',
      '时间戳是可选的。',
      '适合和聊天窗口、回答流组合使用。',
    ],
    props: [
      {
        name: 'message',
        type: 'ChatMessageItem',
        required: true,
        description: '要展示的消息对象。',
      },
    ],
    fields: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: '消息唯一标识。',
      },
      {
        name: 'role',
        type: "ChatRole ('user'|'assistant'|'tool')",
        required: true,
        description: '消息角色。',
      },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: '消息正文。',
      },
      {
        name: 'timestamp',
        type: 'string',
        required: false,
        description: '消息时间戳，可选。',
      },
      {
        name: 'status',
        type: "('streaming'|'final'|'error')",
        required: false,
        description: '消息状态，可选。',
      },
    ],
  },
  {
    id: 'citation',
    title: 'CitationList',
    category: '引用来源',
    summary: '用于展示回答末尾的引用列表，强调编号、文件名、章节标题和匹配分数。',
    description:
      '这个组件只负责把父层已经整理好的引用信息渲染出来，适合直接映射 `SourceRef[]` 后挂在回答正文末尾。',
    fieldTitle: 'items 单项字段说明',
    usage: [
      '传入父组件整理好的 `items` 数组。',
      '每项至少提供编号、文件名和唯一 id。',
      '可选显示章节标题、知识库名和分数。',
    ],
    notes: [
      '组件纯展示，不做文件聚合、折叠或下载行为。',
      '适合放在回答正文后的引用区。',
      '分数支持 0 到 1 或百分制数值输入。',
    ],
    props: [
      {
        name: 'items',
        type: 'CitationItem[]',
        required: true,
        description: '父组件已整理好的引用列表。',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: '组件根节点自定义类名。',
      },
    ],
    fields: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: '引用唯一标识。',
      },
      {
        name: 'index',
        type: 'number',
        required: true,
        description: '回答内引用编号，对应类似 [1] 的展示。',
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: '来源文件名或标题。',
      },
      {
        name: 'heading',
        type: 'string',
        required: false,
        description: '来源章节标题。',
      },
      {
        name: 'score',
        type: 'number',
        required: false,
        description: '匹配分数，支持 0-1 或百分制输入。',
      },
      {
        name: 'knowledgeBaseName',
        type: 'string',
        required: false,
        description: '知识库名称。',
      },
    ],
  },
  {
    id: 'source',
    title: 'SourceCard',
    category: '引用来源',
    summary: '用于展示 RAG 检索结果或引用来源，强调标题、摘要、分数和标签。',
    description:
      '适合把检索证据和回答文本并排呈现，帮助用户快速判断来源可信度和命中位置。',
    fieldTitle: 'source 字段说明',
    usage: [
      '传入单条 `source` 对象。',
      '可展示位置、匹配分数和标签。',
      '适合检索结果列表或证据卡片区。',
    ],
    notes: [
      '分数会自动转换为百分比显示。',
      '标签数组为空时不会渲染标签区。',
      '适合配合回答文本一起展示。',
    ],
    props: [
      {
        name: 'source',
        type: 'SourceCardItem',
        required: true,
        description: '要展示的来源对象。',
      },
    ],
    fields: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: '来源唯一标识。',
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: '来源标题。',
      },
      {
        name: 'excerpt',
        type: 'string',
        required: true,
        description: '来源摘要。',
      },
      {
        name: 'score',
        type: 'number',
        required: true,
        description: '匹配分数，组件会显示为百分比。',
      },
      {
        name: 'location',
        type: 'string',
        required: true,
        description: '文档位置。',
      },
      {
        name: 'tags',
        type: 'string[]',
        required: false,
        description: '可选标签。',
      },
    ],
  },
  {
    id: 'source-group',
    title: 'SourceGroupPanel',
    category: '引用来源',
    summary: '用于展示按文件聚合后的来源面板，强调文件数、最高分、知识库名和下载入口。',
    description:
      '适合放在回答侧栏或证据抽屉中，把父层已经聚合好的来源文件列表统一展示出来，并提供折叠查看能力。',
    fieldTitle: 'items 单项字段说明',
    usage: [
      '传入按文件聚合后的 `items` 数组。',
      '通过 `defaultExpanded` 控制初始展开状态。',
      '仅在 `downloadUrl` 存在时显示下载入口。',
    ],
    notes: [
      '空数组时返回 null，不渲染空壳。',
      '组件纯展示，不处理 `SourceRef[]` 原始聚合逻辑。',
      '分数支持 0 到 1 或百分制数值输入。',
    ],
    props: [
      {
        name: 'items',
        type: 'SourceGroupItem[]',
        required: true,
        description: '父组件已按文件聚合好的来源列表。',
      },
      {
        name: 'defaultExpanded',
        type: 'boolean',
        required: false,
        description: '初始是否展开面板，默认 false。',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: '组件根节点自定义类名。',
      },
    ],
    fields: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: '来源文件唯一标识。',
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: '聚合后的来源文件名。',
      },
      {
        name: 'score',
        type: 'number',
        required: true,
        description: '该文件下的最高命中分数。',
      },
      {
        name: 'knowledgeBaseName',
        type: 'string',
        required: false,
        description: '来源所属知识库名称。',
      },
      {
        name: 'downloadUrl',
        type: 'string',
        required: false,
        description: '文件下载地址，存在时显示下载入口。',
      },
    ],
  },
  {
    id: 'streaming',
    title: 'StreamingText',
    category: '流式输出',
    summary: '用于展示 AI 流式文本状态，只处理展示，不耦合后端协议和状态流转。',
    description:
      '这个组件只负责把不同生成状态展示清楚，适合接在任何文本生成链路的末端。',
    usage: [
      '传入父组件整理后的 `text` 和 `status`。',
      '`idle` 可展示占位文案，`streaming` 可显示光标。',
      '`error` 态可选传入 `onRetry` 提供重试动作。',
    ],
    notes: [
      '支持 idle、streaming、paused、completed、error 五种状态。',
      '不负责请求和协议解析。',
      '可独立用于聊天答案区或生成结果面板。',
    ],
    props: [
      {
        name: 'text',
        type: 'string',
        required: true,
        description: '父组件已整理好的展示文本。',
      },
      {
        name: 'status',
        type: "StreamingStatus ('idle'|'streaming'|'paused'|'completed'|'error')",
        required: false,
        description: '当前展示状态，默认 idle。',
      },
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        description: 'idle 且文本为空时展示的占位文案。',
      },
      {
        name: 'showCursor',
        type: 'boolean',
        required: false,
        description: 'streaming 状态是否显示光标。',
      },
      {
        name: 'speed',
        type: 'number',
        required: false,
        description: '预留参数，便于接入渐进动画控制。',
      },
      {
        name: 'errorMessage',
        type: 'string',
        required: false,
        description: 'error 状态下展示的错误文案。',
      },
      {
        name: 'onRetry',
        type: '() => void',
        required: false,
        description: 'error 状态点击重试按钮时触发。',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: '组件根节点自定义类名。',
      },
    ],
  },
  {
    id: 'timeline',
    title: 'StepTimeline',
    category: '流程链路',
    summary: '用于展示流程步骤、任务状态或 Agent 执行链路。',
    description:
      '适合把文件解析、检索、生成这类步骤拆开说明，让用户一眼看懂当前处理进度。',
    fieldTitle: 'steps 单项字段说明',
    usage: [
      '传入 `steps` 数组。',
      '每个步骤包含标题、描述和状态。',
      '适合工作流、工具调用、处理链路展示。',
    ],
    notes: [
      '支持 `pending`、`running`、`success`、`error` 四种状态。',
      '描述字段可以省略。',
      '可用于展示阶段进度。',
    ],
    props: [
      {
        name: 'steps',
        type: 'StepItem[]',
        required: true,
        description: '步骤列表。',
      },
    ],
    fields: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: '步骤唯一标识。',
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: '步骤标题。',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: '步骤说明。',
      },
      {
        name: 'status',
        type: "('pending'|'running'|'success'|'error')",
        required: true,
        description: '步骤状态。',
      },
    ],
  },
  {
    id: 'upload',
    title: 'UploadPanel',
    category: '文件处理',
    summary: '用于展示上传文件列表、处理中进度和错误重试入口。',
    description:
      '适合文件导入、文档解析、批量上传这类需要清晰状态反馈的场景。',
    fieldTitle: 'files 单项字段说明',
    usage: [
      '传入 `files` 数组。',
      '通过 `onRetry` 提供错误重试行为。',
      '适合文件上传、解析和失败恢复场景。',
    ],
    notes: [
      '进度条只在 `progress` 为数字时显示。',
      '错误态会展示 `errorMessage`。',
      '没有 `onRetry` 时只显示错误信息，不显示重试按钮。',
    ],
    props: [
      {
        name: 'files',
        type: 'UploadFileItem[]',
        required: true,
        description: '文件列表。',
      },
      {
        name: 'onRetry',
        type: '(fileId: string) => void',
        required: false,
        description: '点击错误文件的重试按钮时触发。',
      },
    ],
    fields: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: '文件唯一标识。',
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: '文件名。',
      },
      {
        name: 'sizeLabel',
        type: 'string',
        required: true,
        description: '文件大小展示文案。',
      },
      {
        name: 'status',
        type: "('uploaded'|'processing'|'error')",
        required: true,
        description: '文件状态。',
      },
      {
        name: 'progress',
        type: 'number',
        required: false,
        description: '上传进度，仅处理中显示。',
      },
      {
        name: 'errorMessage',
        type: 'string',
        required: false,
        description: '错误文案。',
      },
    ],
  },
]

const anchorItems = sections.map((section) => ({
  href: `#${section.id}`,
  label: section.title,
}))

function renderValue(type: string, required: boolean) {
  return `${type}${required ? ' · 必填' : ' · 选填'}`
}

function renderExample(sectionId: SectionId) {
  if (sectionId === 'chat') {
    return (
      <div className="example-card">
        <div className="example-card__meta">
          <span>在线实例</span>
          <strong>消息流展示</strong>
        </div>
        <div className="example-card__preview stack">
          {chatMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>
    )
  }

  if (sectionId === 'source') {
    return (
      <div className="example-card">
        <div className="example-card__meta">
          <span>在线实例</span>
          <strong>检索来源卡片</strong>
        </div>
        <div className="example-card__preview stack">
          {sourceCards.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      </div>
    )
  }

  if (sectionId === 'citation') {
    return (
      <div className="example-card">
        <div className="example-card__meta">
          <span>在线实例</span>
          <strong>回答末尾引用列表</strong>
        </div>
        <div className="example-card__preview">
          <CitationList items={citations} />
        </div>
      </div>
    )
  }

  if (sectionId === 'source-group') {
    return (
      <div className="example-card">
        <div className="example-card__meta">
          <span>在线实例</span>
          <strong>来源文件聚合面板</strong>
        </div>
        <div className="example-card__preview">
          <SourceGroupPanel items={sourceGroups} defaultExpanded />
        </div>
      </div>
    )
  }

  if (sectionId === 'streaming') {
    return (
      <div className="example-card">
        <div className="example-card__meta">
          <span>在线实例</span>
          <strong>流式状态展示</strong>
        </div>
        <div className="example-card__preview stack">
          {streamingStates.map((item) => (
            <StreamingText
              key={item.id}
              text={item.text}
              status={item.status}
              speed={item.status === 'streaming' ? 50 : undefined}
              placeholder={item.placeholder}
              errorMessage={item.errorMessage}
              onRetry={
                item.status === 'error'
                  ? () => {
                      console.info('retry streaming')
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    )
  }

  if (sectionId === 'timeline') {
    return (
      <div className="example-card">
        <div className="example-card__meta">
          <span>在线实例</span>
          <strong>步骤链路展示</strong>
        </div>
        <div className="example-card__preview">
          <StepTimeline steps={timelineSteps} />
        </div>
      </div>
    )
  }

  return (
    <div className="example-card">
      <div className="example-card__meta">
        <span>在线实例</span>
        <strong>上传状态展示</strong>
      </div>
      <div className="example-card__preview">
        <UploadPanel
          files={uploadFiles}
          onRetry={(fileId) => {
            console.info('retry upload', fileId)
          }}
        />
      </div>
    </div>
  )
}

function renderBasicUsage(sectionId: SectionId) {
  const snippetMap: Record<SectionId, string> = {
    chat: `import { ChatMessage } from './components'
import type { ChatMessageItem } from './components/ChatMessage/types'

const message: ChatMessageItem = {
  id: 'msg-1',
  role: 'assistant',
  content: '可以，我会先检索文档片段，再把相关来源和结论一起返回。',
  timestamp: '10:21',
  status: 'final',
}

export function Demo() {
  return <ChatMessage message={message} />
}`,
    citation: `import { CitationList } from './components'
import type { CitationItem } from './components/CitationList/types'

const items: CitationItem[] = [
  {
    id: 'citation-1',
    index: 1,
    filename: 'rag-architecture.md',
    heading: '2.3 Retrieval Pipeline',
    score: 0.94,
    knowledgeBaseName: '研发知识库',
  },
  {
    id: 'citation-2',
    index: 2,
    filename: 'handover-notes.pdf',
    heading: 'Chunking Strategy',
    score: 0.87,
  },
]

export function Demo() {
  return <CitationList items={items} />
}`,
    source: `import { SourceCard } from './components'
import type { SourceCardItem } from './components/SourceCard/types'

const source: SourceCardItem = {
  id: 'src-1',
  title: 'rag-workflow.md',
  excerpt: '上传 -> 切片 -> embedding -> 检索 -> 组装 prompt -> 流式输出',
  score: 0.92,
  location: 'L18-L32',
  tags: ['RAG', '检索'],
}

export function Demo() {
  return <SourceCard source={source} />
}`,
    'source-group': `import { SourceGroupPanel } from './components'
import type { SourceGroupItem } from './components/SourceGroupPanel/types'

const items: SourceGroupItem[] = [
  {
    id: 'group-1',
    filename: 'rag-architecture.md',
    score: 0.94,
    knowledgeBaseName: '研发知识库',
    downloadUrl: 'https://example.com/download/rag-architecture.md',
  },
  {
    id: 'group-2',
    filename: 'handover-notes.pdf',
    score: 0.87,
  },
]

export function Demo() {
  return <SourceGroupPanel items={items} defaultExpanded />
}`,
    streaming: `import { StreamingText } from './components'

export function Demo() {
  return (
    <StreamingText
      text="正在检索相关文档并生成回答"
      status="streaming"
      speed={50}
    />
  )
}`,
    timeline: `import { StepTimeline } from './components'
import type { StepItem } from './components/StepTimeline/types'

const steps: StepItem[] = [
  { id: 'step-1', title: '解析上传文件', status: 'success' },
  { id: 'step-2', title: '生成向量', status: 'running' },
  { id: 'step-3', title: '检索并组装上下文', status: 'pending' },
]

export function Demo() {
  return <StepTimeline steps={steps} />
}`,
    upload: `import { UploadPanel } from './components'
import type { UploadFileItem } from './components/UploadPanel/types'

const files: UploadFileItem[] = [
  { id: 'file-1', name: 'rag-workflow.md', sizeLabel: '24 KB', status: 'uploaded' },
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

export function Demo() {
  return (
    <UploadPanel
      files={files}
      onRetry={(fileId) => {
        console.info('retry upload', fileId)
      }}
    />
  )
}`,
  }

  return (
    <pre className="code-block">
      <code>{snippetMap[sectionId]}</code>
    </pre>
  )
}

function App() {
  const sectionGroups = useMemo(
    () =>
      sections.reduce<Record<string, DocSection[]>>((groups, section) => {
        if (!groups[section.category]) {
          groups[section.category] = []
        }

        groups[section.category].push(section)
        return groups
      }, {}),
    [],
  )

  return (
    <div className="doc-app">
      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__logo">FS</span>
          <div>
            <p className="topbar__title">fullstack-ui-kit</p>
            <p className="topbar__subtitle">组件文档</p>
          </div>
        </div>
      </header>

      <div className="doc-shell">
        <aside className="doc-sidebar">
          <div className="doc-sidebar__card">
            <p className="doc-sidebar__eyebrow">Component Docs</p>
            <h1>组件目录</h1>
            <p>
              侧边栏按分类组织当前已有组件，方便从左侧快速跳转到对应文档段落。
            </p>
          </div>

          <nav className="doc-nav" aria-label="组件分类目录">
            {Object.entries(sectionGroups).map(([category, items]) => (
              <section className="doc-nav__group" key={category}>
                <p className="doc-nav__title">{category}</p>
                <div className="doc-nav__items">
                  {items.map((item) => (
                    <a className="doc-nav__item" href={`#${item.id}`} key={item.id}>
                      <span className="doc-nav__marker" />
                      {item.title}
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </nav>
        </aside>

        <main className="doc-content">
          <section className="doc-hero" id="overview">
            <div className="doc-hero__intro">
              <p className="section-kicker">Overview</p>
              <h2>fullstack-ui-kit</h2>
              <p className="doc-hero__desc">
                这是一个面向 AI 应用的 React 组件库，聚焦对话展示、检索来源、流式文本、流程链路和上传状态这几类高频界面。
              </p>
            </div>
          </section>

          {sections.map((section) => (
            <section className="doc-section" id={section.id} key={section.id}>
              <div className="doc-section__header">
                <div>
                  <p className="section-kicker">{section.category}</p>
                  <h3 className="section-title">{section.title}</h3>
                </div>
                <p>{section.summary}</p>
              </div>

              <div className="doc-intro">
                <p>{section.description}</p>
              </div>

              <article className="doc-card doc-card--combined">
                <div className="doc-card__header">
                  <h4>说明 / 使用</h4>
                  <span>{section.usage.length} 步</span>
                </div>
                <p>{section.summary}</p>
                <p className="doc-card__mini">{section.description}</p>
                <ul className="doc-card__notes">
                  {section.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </article>

              {renderExample(section.id)}

              <details className="demo-disclosure">
                <summary className="demo-disclosure__summary">
                  <span>基础用法</span>
                  <span>React 示例</span>
                </summary>
                <div className="demo-disclosure__body">{renderBasicUsage(section.id)}</div>
              </details>

              <details className="demo-disclosure">
                <summary className="demo-disclosure__summary">
                  <span>参数说明</span>
                  <span>{section.props.length} 个参数</span>
                </summary>
                <div className="demo-disclosure__body">
                  <div className="api-table">
                    <div className="api-table__head">
                      <span>参数</span>
                      <span>类型</span>
                      <span>说明</span>
                    </div>
                    {section.props.map((prop) => (
                      <div className="api-table__row" key={prop.name}>
                        <span>
                          <strong>{prop.name}</strong>
                          <em>{prop.required ? '必填' : '选填'}</em>
                        </span>
                        <span>{renderValue(prop.type, prop.required)}</span>
                        <span>{prop.description}</span>
                      </div>
                    ))}
                  </div>
                  {section.fields?.length ? (
                    <div className="api-subtable">
                      <div className="api-subtable__head">{section.fieldTitle ?? '字段说明'}</div>
                      <div className="api-table">
                        <div className="api-table__head">
                          <span>字段</span>
                          <span>类型</span>
                          <span>说明</span>
                        </div>
                        {section.fields.map((field) => (
                          <div className="api-table__row" key={field.name}>
                            <span>
                              <strong>{field.name}</strong>
                              <em>{field.required ? '必填' : '选填'}</em>
                            </span>
                            <span>{renderValue(field.type, field.required)}</span>
                            <span>{field.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </details>
            </section>
          ))}
        </main>

        <aside className="doc-anchor">
          <div className="doc-anchor__card">
            <p className="doc-anchor__eyebrow">On this page</p>
            <h2>页面锚点</h2>
            <nav className="doc-anchor__nav" aria-label="页面内锚点目录">
              {anchorItems.map((item) => (
                <a className="doc-anchor__item" href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App
