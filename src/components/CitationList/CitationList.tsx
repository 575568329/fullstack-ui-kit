import styles from './CitationList.module.css'
import type { CitationListProps } from './types'

function joinClassName(...classNames: Array<string | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

function formatScore(score?: number): string | null {
  if (typeof score !== 'number' || Number.isNaN(score)) {
    return null
  }

  const normalizedScore = score > 1 ? score : score * 100
  return `${Math.round(normalizedScore)}%`
}

export function CitationList({ items, className }: CitationListProps) {
  return (
    <ol className={joinClassName(styles.list, className)}>
      {items.map((item) => {
        const scoreLabel = formatScore(item.score)

        return (
          <li className={styles.item} key={item.id}>
            <div className={styles.head}>
              <div>
                <div className={styles.titleRow}>
                  <span className={styles.index} aria-hidden="true">
                    [{item.index}]
                  </span>
                  <h3 className={styles.filename}>{item.filename}</h3>
                  {item.knowledgeBaseName ? (
                    <span className={styles.kbName}>{item.knowledgeBaseName}</span>
                  ) : null}
                </div>
                {item.heading ? <p className={styles.heading}>{item.heading}</p> : null}
              </div>
              {scoreLabel ? <span className={styles.score}>{scoreLabel}</span> : null}
            </div>

            <div className={styles.meta}>
              <span className={styles.metaItem}>引用编号 [{item.index}]</span>
              {item.heading ? <span className={styles.metaItem}>章节 {item.heading}</span> : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
