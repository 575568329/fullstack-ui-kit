import styles from './UploadPanel.module.css'
import type { UploadFileItem } from './types'

interface UploadPanelProps {
  files: UploadFileItem[]
  onRetry?: (fileId: string) => void
}

export function UploadPanel({ files, onRetry }: UploadPanelProps) {
  return (
    <div className={styles.panel}>
      {files.map((file) => (
        <article className={styles.file} key={file.id}>
          <div className={styles.row}>
            <div>
              <h3 className={styles.name}>{file.name}</h3>
              <p className={styles.meta}>{file.sizeLabel}</p>
            </div>
            <span className={styles.meta}>{file.status}</span>
          </div>

          {typeof file.progress === 'number' ? (
            <div className={styles.progress} aria-label={`${file.name} progress`}>
              <div className={styles.bar} style={{ width: `${file.progress}%` }} />
            </div>
          ) : null}

          {file.status === 'error' ? (
            <div className={styles.error}>
              <span>{file.errorMessage ?? 'Upload failed'}</span>
              {onRetry ? (
                <button className={styles.retry} type="button" onClick={() => onRetry(file.id)}>
                  Retry
                </button>
              ) : null}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  )
}
