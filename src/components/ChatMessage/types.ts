export type ChatRole = 'user' | 'assistant' | 'tool'

export interface ChatMessageItem {
  id: string
  role: ChatRole
  content: string
  timestamp?: string
  status?: 'streaming' | 'final' | 'error'
}
