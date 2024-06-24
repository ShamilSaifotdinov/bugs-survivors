import { ChangeEvent, useEffect, useMemo, useState, useTransition } from 'react'
import styles from './styles.module.scss'
import { Avatar, TablePagination, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getTopicComments, getTopicInfo } from '../../../api/basic/forum'
import CommentTextarea from './CommentTextarea'
import MetaData from '../MetaData'
import { TopicData } from '../constants'
import getAvatarSrc from '../../../helpers/getAvatarSrc'
import CommentTable from './CommentTable'

export type TopicRowDataType = {
  creator: JSX.Element
  id: number
  content: string | JSX.Element
  replies_count: number
}

function getTableRowsData(data: TopicData[]): TopicRowDataType[] {
  return (
    data.map(item => ({
      ...item,
      creator: (
        <div className={styles.user}>
          <Avatar
            className={styles.avatar}
            alt={item.creator.login}
            src={getAvatarSrc(item.creator.avatar)}
          />
          <Typography variant="body1" fontSize="0.75rem">
            {item.creator.login}
          </Typography>
        </div>
      ),
    })) ?? []
  )
}

export default function Topic() {
  const [isPending, startTransition] = useTransition()
  const { topicId } = useParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  const [commentsAmount, setCommentsAmount] = useState(0)
  const [topicName, setTopicName] = useState('')
  const [data, setData] = useState<TopicData[]>([])

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

  const tableRows = useMemo(
    () =>
      getTableRowsData(data).map(row => (
        <CommentTable
          key={row.id}
          commentId={row.id}
          row={row}
          nestingLevel={0}
        />
      )),
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

  return (
    <>
      <MetaData title={topicName} />
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
      <CommentTextarea
        callback={() =>
          setComments().then(() => setCommentsAmount(commentsAmount + 1))
        }
      />
    </>
  )
}
