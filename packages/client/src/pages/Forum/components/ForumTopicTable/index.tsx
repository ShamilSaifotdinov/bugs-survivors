import { ChangeEvent, useEffect, useMemo, useState, useTransition } from 'react'
import styles from './styles.module.scss'
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import EmojiPicker from '@emoji-mart/react'
import emojiData from '@emoji-mart/data'
import { clsx } from 'clsx'
import { ForumTopicData, forumTopicColumns } from '../constants'
import {
  createComment,
  getTopicComments,
  getTopicInfo,
} from '../../../../api/basic/forum'
import { useAppSelector } from '../../../../hooks/reduxHooks'

function getTableRowsData(data: ForumTopicData[]) {
  return (
    data.map(item => ({
      ...item,
      creator: (
        <div className={styles.user}>
          <Avatar
            className={styles.avatar}
            alt={item.creator.login}
            src={item.creator.avatar}
          />
          <Typography variant="body1" fontSize="0.75rem">
            {item.creator.login}
          </Typography>
        </div>
      ),
    })) ?? []
  )
}

export default function ForumTopicTable() {
  const [isPending, startTransition] = useTransition()
  const { topicId } = useParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  const [textareaText, setTextareaText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [commentsAmount, setCommentsAmount] = useState(0)
  const [topicName, setTopicName] = useState('')
  const [data, setData] = useState<ForumTopicData[]>([])

  const user = useAppSelector(state => state.user.user)

  function setComments() {
    return getTopicComments(
      Number(topicId),
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ).then(data => {
      setData(data)
    })
  }

  useEffect(() => {
    getTopicInfo(Number(topicId)).then(data => {
      setCommentsAmount(data.comments_count)
      setTopicName(data.name)
    })
  }, [topicId])

  useEffect(() => {
    setComments()
  }, [page, rowsPerPage, topicId])

  const tableRows = useMemo(
    () =>
      getTableRowsData(data).map(row => {
        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            className={styles.tr}>
            {forumTopicColumns.map(column => {
              const value = row[column.id]
              return (
                <TableCell
                  key={column.id}
                  className={clsx(
                    styles.tc,
                    column.className ? styles[column.className] : ''
                  )}>
                  {value}
                </TableCell>
              )
            })}
          </TableRow>
        )
      }),
    [data]
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    startTransition(() => {
      setPage(newPage)
    })
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    })
  }

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
      setComments().then(() => setCommentsAmount(commentsAmount + 1))
    })
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{topicName}</title>
        <meta name="description" content={topicName} />
      </Helmet>
      <div className={styles.table}>
        <Table>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </div>
      <TablePagination
        className={styles.pagination}
        rowsPerPageOptions={[1, 2, 5, 10]}
        component="div"
        count={commentsAmount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div className={styles.textarea_container}>
        <textarea
          className={styles.textarea}
          value={textareaText}
          onChange={textareaChangeHandle}
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
            onClick={handleCreateComment}
            variant="contained"
            className={styles.send_button}>
            SEND
          </Button>
        </div>
      </div>
    </>
  )
}
