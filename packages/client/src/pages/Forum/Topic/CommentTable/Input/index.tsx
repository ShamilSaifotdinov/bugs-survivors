import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { Button, TextField } from '@mui/material'
import EmojiPicker from '@emoji-mart/react'
import emojiData from '@emoji-mart/data'
import { createCommentReply } from '../../../../../api/basic/forum'
import { useAppSelector } from '../../../../../hooks/reduxHooks'
import { CreateCommentReplyData } from '../../../../../api/basic/forum/types'

interface IProps {
  replyId?: number
  commentId: number
  callback: () => Promise<void>
}

export default function Input({ replyId, commentId, callback }: IProps) {
  const [inputText, setInputText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const user = useAppSelector(state => state.user.user)

  const inputChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  const onEmojiSelectHandle = ({ native }: { native: string }) => {
    setInputText(`${inputText}${native}`)
    setShowEmojiPicker(false)
  }

  const showEmojiButtonHandle = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleCreateCommentReply = () => {
    const creationData: CreateCommentReplyData = {
      commentId,
      content: inputText,
      creator: {
        id: user.id,
        login: user.login,
        avatar: user.avatar,
      },
    }

    if (replyId) {
      creationData.replyId = replyId
    }

    createCommentReply(creationData).then(() => {
      setInputText('')
      callback()
    })
  }

  return (
    <div className={styles.input_container}>
      <TextField
        className={styles.input}
        value={inputText}
        onChange={inputChangeHandle}
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
          onClick={handleCreateCommentReply}
          variant="contained"
          className={styles.send_button}>
          SEND
        </Button>
      </div>
    </div>
  )
}
