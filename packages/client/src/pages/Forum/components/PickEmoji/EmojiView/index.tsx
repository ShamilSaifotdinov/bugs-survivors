import { Emoji } from '../../../constants'
import styles from './styles.module.scss'

interface IProps {
  emoji: Emoji
  clickOnEmoji?: (e: string) => void
}

function EmojiView({ emoji, clickOnEmoji }: IProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const firstChild = e.currentTarget.firstChild
    if (firstChild?.textContent) {
      clickOnEmoji?.(firstChild.textContent)
    }
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.emoji}>{emoji.emoji}</div>
      <span>{emoji.count}</span>
    </div>
  )
}

export default EmojiView
