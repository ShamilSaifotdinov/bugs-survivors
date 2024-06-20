import { useCallback, useState } from 'react'
import EmojiView from './EmojiView'
import styles from './style.module.scss'
import EmojiButton from './EmojiButton'

function PickEmoji() {
  const [currentEmoji, setCurrentEmoji] = useState<string[]>([])

  const toggleEmoji = useCallback(
    (emoji: string) => {
      const emojiIndex = currentEmoji.indexOf(emoji)
      emojiIndex === -1
        ? setCurrentEmoji([...currentEmoji, emoji])
        : setCurrentEmoji(currentEmoji.filter((_, inx) => inx !== emojiIndex))
    },
    [currentEmoji]
  )

  return (
    <div className={styles.root}>
      <div className={styles.emojiContainer}>
        {currentEmoji.length > 0 &&
          currentEmoji.map(emoji => {
            return <EmojiView key={emoji} count="220" emoji={emoji} />
          })}
      </div>
      <EmojiButton onEmojiSelect={toggleEmoji} />
    </div>
  )
}

export default PickEmoji
