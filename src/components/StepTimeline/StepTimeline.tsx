import styles from './StepTimeline.module.css'
import type { StepItem } from './types'

interface StepTimelineProps {
  steps: StepItem[]
}

export function StepTimeline({ steps }: StepTimelineProps) {
  return (
    <div className={styles.timeline}>
      {steps.map((step) => (
        <article className={styles.step} key={step.id}>
          <div className={styles.top}>
            <h3 className={styles.title}>{step.title}</h3>
            <span className={styles.status} data-status={step.status}>
              {step.status}
            </span>
          </div>
          {step.description ? <p className={styles.description}>{step.description}</p> : null}
        </article>
      ))}
    </div>
  )
}
