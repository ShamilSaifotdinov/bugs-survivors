import { useCallback, useEffect, useState } from 'react'
import EmojiView from './EmojiView'
import styles from './style.module.scss'
import EmojiButton from './EmojiButton'
import { Emoji } from '../../constants'
import { updateEmoji } from '../../../../api/basic/forum'

interface IProps {
  emoji: Emoji[] | []
  commentId: number
}

function PickEmoji({ emoji, commentId }: IProps) {
  const [currentEmoji, setCurrentEmoji] = useState<Emoji[]>(emoji)

  useEffect(() => {
    setCurrentEmoji(emoji)
  }, [emoji])

  const toggleEmoji = useCallback(
    (emoji: string) => {
      updateEmoji(Number(commentId), {
        emoji,
      })
        .then(res => {
          setCurrentEmoji(res)
        })
        .catch(e => console.error(e))
    },
    [commentId]
  )

  return (
    <div className={styles.root}>
      <div className={styles.emojiContainer}>
        {currentEmoji &&
          currentEmoji.map(emoji => {
            return (
              <EmojiView
                key={emoji.emoji}
                emoji={emoji}
                clickOnEmoji={toggleEmoji}
              />
            )
          })}
      </div>
      <EmojiButton onEmojiSelect={toggleEmoji} />
    </div>
  )
}

export default PickEmoji
