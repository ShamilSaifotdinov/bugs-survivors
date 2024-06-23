import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import EmojiPicker from '@emoji-mart/react'
import emojiData from '@emoji-mart/data'
import { createComment } from '../../../../api/basic/forum'
import { useAppSelector } from '../../../../hooks/reduxHooks'

type IProps = {
  callback: () => Promise<void>
}

export default function ForumTextareaComment({ callback }: IProps) {
  const { topicId } = useParams()
  const [textareaText, setTextareaText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const user = useAppSelector(state => state.user.user)

  const textareaChangeHandle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaText(event.target.value)
  }

  const showEmojiButtonHandle = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const onEmojiSelectHandle = ({ native }: { native: string }) => {
    setTextareaText(`${textareaText}${native}`)
    setShowEmojiPicker(false)
  }

  const handleCreateComment = () => {
    createComment({
      topicId: Number(topicId),
      content: textareaText,
      creator: {
        id: user.id,
        login: user.login,
        avatar: user.avatar,
      },
    }).then(() => {
      setTextareaText('')
      callback()
    })
  }

  return (
    <div className={styles.textarea_container}>
      <textarea
        className={styles.textarea}
        value={textareaText}
        onChange={textareaChangeHandle}
      />
      <div className={styles.buttons_container}>
        {showEmojiPicker && (
          <div className={styles.emoji_picker}>
            <EmojiPicker data={emojiData} onEmojiSelect={onEmojiSelectHandle} />
          </div>
        )}
        <Button
          variant="contained"
          className={styles.emoji_button}
          onClick={showEmojiButtonHandle}
        />
        <Button
          onClick={handleCreateComment}
          variant="contained"
          className={styles.send_button}>
          SEND
        </Button>
      </div>
    </div>
  )
}
