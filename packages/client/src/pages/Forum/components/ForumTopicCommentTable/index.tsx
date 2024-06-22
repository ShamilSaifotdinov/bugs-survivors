import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Collapse,
  TextField,
} from '@mui/material'
import EmojiPicker from '@emoji-mart/react'
import emojiData from '@emoji-mart/data'
import { clsx } from 'clsx'
import { ForumTopicData, forumTopicColumns } from '../constants'
import {
  CreateCommentReplyData,
  createCommentReply,
  getCommentReplies,
} from '../../../../api/basic/forum'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { ForumTopicTableRowDataType } from '../ForumTopicTable'

function getTableTopicCommentRowsData(
  data: ForumTopicData[],
  nestingLevel: number
) {
  return (
    data.map(item => ({
      ...item,
      content: (
        <div>
          {item.creator.login}
          <br />
          {item.content}
        </div>
      ),
      creator: (
        <div className={styles.user}>
          <Avatar
            className={clsx(
              styles.avatar,
              nestingLevel === 0 ? styles.avatar_reply : ''
            )}
            alt={item.creator.login}
            src={item.creator.avatar}
          />
          {nestingLevel !== 0 && (
            <Typography variant="body1" fontSize="0.75rem">
              {item.creator.login}
            </Typography>
          )}
        </div>
      ),
    })) ?? []
  )
}

interface IProps {
  replyId?: number
  commentId: number
  row: ForumTopicTableRowDataType
  nestingLevel: number
}

export default function ForumTopicCommentTable({
  replyId,
  commentId,
  row,
  nestingLevel,
}: IProps) {
  const rowsPerPage = 10
  const [inputText, setInputText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [repliesAmount, setRepliesAmount] = useState(0)
  const [data, setData] = useState<ForumTopicData[]>([])
  const [expanded, setExpanded] = useState(false)
  const currentNestingLevel = nestingLevel

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const user = useAppSelector(state => state.user.user)

  function setCommentReplies() {
    return getCommentReplies(
      commentId,
      repliesAmount,
      rowsPerPage,
      replyId
    ).then(responseData => {
      setData([...data, ...responseData])
      setRepliesAmount(repliesAmount + responseData.length)
    })
  }

  useEffect(() => {
    setCommentReplies()
  }, [])

  const tableRows = useMemo(
    () =>
      getTableTopicCommentRowsData(data, currentNestingLevel).map(row => (
        <ForumTopicCommentTable
          key={row.id}
          replyId={row.id}
          commentId={commentId}
          row={row}
          nestingLevel={currentNestingLevel + 1}
        />
      )),
    [data]
  )

  const handleLoadMore = () => {
    setCommentReplies()
  }

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
      setCommentReplies()
    })
  }

  return (
    <div
      style={{
        width: `calc(100% - ${20 * currentNestingLevel}px)`,
        marginLeft: 'auto',
      }}>
      <Table className={styles.table}>
        <TableBody>
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            className={currentNestingLevel === 0 ? styles.tr : styles.tr_reply}>
            {forumTopicColumns.map(column => {
              const value = row[column.id]
              return (
                <TableCell
                  key={column.id}
                  className={clsx(
                    currentNestingLevel === 0 ? styles.tc : styles.tc_reply,
                    column.className ? styles[column.className] : ''
                  )}>
                  {value}
                </TableCell>
              )
            })}
          </TableRow>
        </TableBody>
      </Table>

      <div className={styles.input_container}>
        <TextField
          className={styles.input}
          value={inputText}
          onChange={inputChangeHandle}
        />
        <div className={styles.buttons_container}>
          {showEmojiPicker && (
            <div className={styles.emoji_picker}>
              <EmojiPicker
                data={emojiData}
                onEmojiSelect={onEmojiSelectHandle}
              />
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

      <Button
        onClick={handleExpandClick}
        color="secondary"
        className={clsx(styles.collapse, styles.collapse_rigth)}>
        {repliesAmount} replies ▼
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {tableRows}
      </Collapse>

      {row.replies_count - repliesAmount > 0 && (
        <>
          <Button
            onClick={handleLoadMore}
            color="secondary"
            className={styles.collapse}>
            {row.replies_count - repliesAmount} more replies ▼
          </Button>
        </>
      )}
    </div>
  )
}
