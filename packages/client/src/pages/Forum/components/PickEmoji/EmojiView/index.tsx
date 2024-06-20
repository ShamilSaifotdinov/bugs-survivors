import styles from './styles.module.scss'

type EmojiViewProps = {
  count: number | string
  emoji: string
}

function EmojiView(props: EmojiViewProps) {
  return (
    <div className={styles.container}>
      <div className={styles.emoji}>{props.emoji}</div>

      <span>{props.count}</span>
    </div>
  )
}

export default EmojiView
