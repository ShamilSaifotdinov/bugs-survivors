import React, { useCallback, useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import EmojiPicker from '@emoji-mart/react'
import EmojiView from './EmojiView'
import styles from './style.module.scss'
import EmojiButton from './EmojiButton'

function PickEmoji() {
  const [currentEmoji, setCurrentEmoji] = useState<string[]>([])

  const toggleEmoji = useCallback(
    (emoji: any) => {
      const emojiIndex = currentEmoji.indexOf(emoji)
      console.log(emoji, emojiIndex)
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
            return <EmojiView count="220" emoji={emoji} />
          })}
      </div>
      <EmojiButton onEmojiSelect={toggleEmoji} />
    </div>
  )
}

export default PickEmoji
