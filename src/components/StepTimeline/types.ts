export type StepStatus = 'pending' | 'running' | 'success' | 'error'

export interface StepItem {
  id: string
  title: string
  description?: string
  status: StepStatus
}
