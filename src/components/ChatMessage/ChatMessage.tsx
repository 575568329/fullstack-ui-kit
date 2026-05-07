import styles from './ChatMessage.module.css'
import type { ChatMessageItem } from './types'

interface ChatMessageProps {
  message: ChatMessageItem
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <article className={styles.message} data-role={message.role}>
      <div className={styles.meta}>
        <span className={styles.role}>
          <span>{message.role}</span>
          {message.timestamp ? <span>{message.timestamp}</span> : null}
        </span>
        {message.status ? <span className={styles.status}>{message.status}</span> : null}
      </div>
      <p className={styles.content}>{message.content}</p>
    </article>
  )
}
