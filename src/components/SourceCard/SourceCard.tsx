import styles from './SourceCard.module.css'
import type { SourceCardItem } from './types'

interface SourceCardProps {
  source: SourceCardItem
}

export function SourceCard({ source }: SourceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <div>
          <h3 className={styles.title}>{source.title}</h3>
          <p className={styles.excerpt}>{source.excerpt}</p>
        </div>
        <span className={styles.score}>{Math.round(source.score * 100)}%</span>
      </div>
      <div className={styles.footer}>
        <span>{source.location}</span>
        {source.tags?.length ? (
          <div className={styles.tags}>
            {source.tags.map((tag) => (
              <span className={styles.tag} key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
