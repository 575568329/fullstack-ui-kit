export type StreamingStatus = 'idle' | 'streaming' | 'paused' | 'completed' | 'error'

export interface StreamingTextProps {
  text: string
  status?: StreamingStatus
  placeholder?: string
  showCursor?: boolean
  speed?: number
  errorMessage?: string
  onRetry?: () => void
  className?: string
}
