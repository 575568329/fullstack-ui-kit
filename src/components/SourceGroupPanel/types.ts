export interface SourceGroupItem {
  id: string
  filename: string
  score: number
  knowledgeBaseName?: string
  downloadUrl?: string
}

export interface SourceGroupPanelProps {
  items: SourceGroupItem[]
  defaultExpanded?: boolean
  className?: string
}
