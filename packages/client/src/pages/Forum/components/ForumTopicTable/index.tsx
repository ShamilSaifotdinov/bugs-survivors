import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import {
  Avatar,
  Button,
  SimplePaletteColorOptions,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import mockData from '../../../../../mockData.json'
import { useParams } from 'react-router-dom'
import { themeOptions } from '../../../../mui-workplace-preset'
import EmojiPicker from '@emoji-mart/react'
import emojiData from '@emoji-mart/data'

type User = {
  id: string
  avatar: string
  name: string
}

type Data = {
  author: User
  answer: string
}

type Column = {
  id: keyof Data
  width: string
  backgroundColor: string
  color: string
  align?: TableCellProps['align']
  verticalAlign?: string
}

const primaryPaletteThemeOptions = themeOptions.palette
  ?.primary as SimplePaletteColorOptions
const textThemeOptions = themeOptions.palette?.text

const columns: readonly Column[] = [
  {
    id: 'author',
    backgroundColor: primaryPaletteThemeOptions.dark ?? '#345256',
    color: textThemeOptions?.primary ?? '#fff',
    width: '17.5rem',
    align: 'center',
  },
  {
    id: 'answer',
    backgroundColor: primaryPaletteThemeOptions.light ?? '#345256',
    color: textThemeOptions?.secondary ?? '#000',
    width: '92.5rem',
    verticalAlign: 'baseline',
  },
]

export default function ForumTopicTable() {
  const { forumId, topicId } = useParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  const [textareaText, setTextareaText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const tableRows =
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
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
          <TableBody>
            {tableRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    className={styles.tr}>
                    {columns.map(column => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          className={styles.tc}
                          key={column.id}
                          align={column.align}
                          style={{
                            width: column.width,
                            backgroundColor: column.backgroundColor,
                            border: '1px solid #fff',
                            color: column.color,
                            verticalAlign: column.verticalAlign,
                          }}>
                          {value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        className={styles.pagination}
        rowsPerPageOptions={[1, 2, 5, 10]}
        component="div"
        count={tableRows.length}
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
