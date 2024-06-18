import { useCallback, useState, memo } from 'react'
import styles from './styles.module.scss'
import { IconButton } from '@mui/material'
import EmojiPicker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import clsx, { ClassValue } from 'clsx'

type EmojiButtonProps = {
  onEmojiSelect: (e: any) => void
  classNameBtn?: ClassValue
  classNamePicker?: ClassValue
}

function EmojiButton({
  onEmojiSelect,
  classNameBtn,
  classNamePicker,
}: EmojiButtonProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false)

  const toggleEmojiBar = useCallback(
    () => setIsPickerVisible(!isPickerVisible),
    [isPickerVisible]
  )

  return (
    <div className={styles.container}>
      <IconButton
        className={clsx(styles.emojiButton, classNameBtn)}
        onClick={toggleEmojiBar}
        sx={{ padding: 0 }}>
        <div className={styles.emojiButton} />
      </IconButton>
      {isPickerVisible ? (
        <div className={clsx(styles.pickerWrapper, classNamePicker)}>
          <EmojiPicker
            dynamicWidth={true}
            data={data}
            previewPosition="none"
            onEmojiSelect={(e: any) => {
              onEmojiSelect(e.native)
              toggleEmojiBar()
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default memo(EmojiButton)
