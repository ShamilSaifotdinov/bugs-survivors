import { ChangeEvent, useEffect, useMemo, useState, useTransition } from 'react'
import styles from './styles.module.scss'
import { TablePagination } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ForumTopicData } from '../constants'
import { getTopicComments, getTopicInfo } from '../../../../api/basic/forum'
import ForumMetaData from '../ForumMetaData'
import ForumTextareaComment from '../ForumTextareaComment'
import ForumTopicTableRow from './ForumTopicTableRow'

export type ForumTopicTableRowDataType = {
  creator: JSX.Element
  id: number
  content: string | JSX.Element
  replies_count: number
}

export default function ForumTopicTable() {
  const [isPending, startTransition] = useTransition()
  const { topicId } = useParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  const [commentsAmount, setCommentsAmount] = useState(0)
  const [topicName, setTopicName] = useState('')
  const [data, setData] = useState<ForumTopicData[]>([])

  function setComments() {
    return getTopicComments(Number(topicId), {
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    }).then(data => {
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

  const tableRows = useMemo(() => <ForumTopicTableRow data={data} />, [data])

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

  return (
    <>
      <ForumMetaData title={topicName} />
      <div>{tableRows}</div>
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
      <ForumTextareaComment
        callback={() =>
          setComments().then(() => setCommentsAmount(commentsAmount + 1))
        }
      />
    </>
  )
}
