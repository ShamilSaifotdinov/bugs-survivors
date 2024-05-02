import { ChangeEvent, useMemo, useState, useTransition } from 'react'
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
import mockData from '../../../../../mockData.json'
import { useParams } from 'react-router-dom'
import EmojiPicker from '@emoji-mart/react'
import emojiData from '@emoji-mart/data'
import { clsx } from 'clsx'
import { forumTopicColumns } from '../constants'

export default function ForumTopicTable() {
  const [isPending, startTransition] = useTransition()
  const { forumId, topicId } = useParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  const [textareaText, setTextareaText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const tableRowsData =
    mockData?.forum
      .find(item => item.id === forumId)
      ?.data.find(item => item.id === topicId)
      ?.answers?.map(item => ({
        id: item.id,
        answer: item.answer,
        author: (
          <div className={styles.user}>
            <Avatar
              className={styles.avatar}
              alt={item.author.name}
              src={item.author.avatar}
            />
            <Typography variant="body1" fontSize="0.75rem">
              {item.author.name}
            </Typography>
          </div>
        ),
      })) ?? []

  const tableRows = useMemo(
    () =>
      tableRowsData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(row => {
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
    [page, rowsPerPage]
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

  return (
    <>
      <div className={styles.table}>
        <Table>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </div>
      <TablePagination
        className={styles.pagination}
        rowsPerPageOptions={[1, 2, 5, 10]}
        component="div"
        count={tableRowsData.length}
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
            onClick={showEmojiButtonHandle}></Button>
          <Button variant="contained" className={styles.send_button}>
            SEND
          </Button>
        </div>
      </div>
    </>
  )
}
