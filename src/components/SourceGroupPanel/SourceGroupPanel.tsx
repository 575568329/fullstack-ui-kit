import { useState } from 'react'
import styles from './SourceGroupPanel.module.css'
import type { SourceGroupPanelProps } from './types'

function joinClassName(...classNames: Array<string | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

function formatScore(score: number): string {
  const normalizedScore = score > 1 ? score : score * 100
  return `${Math.round(normalizedScore)}%`
}

export function SourceGroupPanel({
  items,
  defaultExpanded = false,
  className,
}: SourceGroupPanelProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  if (!items.length) {
    return null
  }

  const sourceCountLabel = `${items.length} 个来源文件`

  return (
    <section className={joinClassName(styles.panel, className)}>
      <button
        className={styles.toggle}
        type="button"
        aria-expanded={isExpanded}
        onClick={() => {
          setIsExpanded((expanded) => !expanded)
        }}
      >
        <div className={styles.toggleContent}>
          <span className={styles.eyebrow}>来源汇总</span>
          <div className={styles.headingRow}>
            <h3 className={styles.title}>SourceGroupPanel</h3>
            <span className={styles.count}>{sourceCountLabel}</span>
          </div>
        </div>
        <span className={styles.chevron} aria-hidden="true">
          {isExpanded ? '收起' : '展开'}
        </span>
      </button>

      {isExpanded ? (
        <ol className={styles.list}>
          {items.map((item) => (
            <li className={styles.item} key={item.id}>
              <div className={styles.itemHead}>
                <div className={styles.fileBlock}>
                  <h4 className={styles.filename}>{item.filename}</h4>
                  {item.knowledgeBaseName ? (
                    <p className={styles.kbName}>{item.knowledgeBaseName}</p>
                  ) : null}
                </div>
                <span className={styles.score}>{formatScore(item.score)}</span>
              </div>

              <div className={styles.itemMeta}>
                <span className={styles.metaLabel}>最高命中分数</span>
                {item.downloadUrl ? (
                  <a
                    className={styles.downloadLink}
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    下载文件
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  )
}
