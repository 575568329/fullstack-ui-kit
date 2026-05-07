export interface CitationItem {
  id: string
  index: number
  filename: string
  heading?: string
  score?: number
  knowledgeBaseName?: string
}

export interface CitationListProps {
  items: CitationItem[]
  className?: string
}
