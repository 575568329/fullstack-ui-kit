import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './StreamingText.module.css'
import type { StreamingStatus, StreamingTextProps } from './types'

const STATUS_LABELS: Record<StreamingStatus, string> = {
  idle: 'idle',
  streaming: 'streaming',
  paused: 'paused',
  completed: 'completed',
  error: 'error',
}

function joinClassName(...classNames: Array<string | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

export function StreamingText({
  text,
  status = 'idle',
  placeholder = '等待开始输出…',
  showCursor = true,
  speed = 28,
  errorMessage = '生成失败，请稍后重试。',
  onRetry,
  className,
}: StreamingTextProps) {
  const isError = status === 'error'
  const normalizedSpeed = Math.max(16, speed)
  const [visibleCount, setVisibleCount] = useState(() => (status === 'streaming' ? 0 : text.length))
  const previousStatusRef = useRef<StreamingStatus>(status)

  useEffect(() => {
    const previousStatus = previousStatusRef.current
    if (status === 'streaming' && previousStatus !== 'streaming') {
      setVisibleCount(0)
    }
    previousStatusRef.current = status
  }, [status])

  useEffect(() => {
    if (status === 'streaming') {
      return
    }
    if (status === 'idle') {
      setVisibleCount(0)
      return
    }
    setVisibleCount(text.length)
  }, [status, text])

  useEffect(() => {
    if (status !== 'streaming') {
      return
    }
    if (visibleCount >= text.length) {
      return
    }

    const timer = window.setTimeout(() => {
      setVisibleCount((previous) => {
        if (previous >= text.length) {
          return previous
        }
        return previous + 1
      })
    }, normalizedSpeed)

    return () => {
      window.clearTimeout(timer)
    }
  }, [status, text, visibleCount, normalizedSpeed])

  const displayText = useMemo(() => {
    if (status === 'idle' && !text) {
      return placeholder
    }
    if (status === 'streaming' || status === 'paused') {
      return text.slice(0, visibleCount)
    }
    return text
  }, [status, text, placeholder, visibleCount])

  const shouldShowPlaceholder = status === 'idle' && !text
  const shouldShowCursor = showCursor && status === 'streaming' && !isError

  return (
    <article className={joinClassName(styles.streamingText, className)} data-status={status}>
      <p className={joinClassName(styles.content, shouldShowPlaceholder ? styles.placeholder : undefined)}>
        {displayText}
        {shouldShowCursor ? <span className={styles.cursor}>|</span> : null}
      </p>

      <div className={styles.meta}>
        <span className={styles.status} data-status={status}>
          {STATUS_LABELS[status]}
        </span>
      </div>

      {isError ? (
        <div className={styles.errorRow}>
          <span>{errorMessage}</span>
          {onRetry ? (
            <button className={styles.retryButton} type="button" onClick={onRetry}>
              重试
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
