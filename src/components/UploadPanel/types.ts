export type UploadStatus = 'uploaded' | 'processing' | 'error'

export interface UploadFileItem {
  id: string
  name: string
  sizeLabel: string
  status: UploadStatus
  progress?: number
  errorMessage?: string
}
