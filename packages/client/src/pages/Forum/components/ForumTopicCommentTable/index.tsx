import { useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Collapse,
  Avatar,
} from '@mui/material'
import { clsx } from 'clsx'
import { ForumTopicData, forumTopicColumns } from '../constants'
import { getCommentReplies } from '../../../../api/basic/forum'
import { ForumTopicTableRowDataType } from '../ForumTopicTable'
import { getCommentRepliesData } from '../../../../api/basic/forum/types'
import ForumTopicCommentTableRow from './ForumTopicCommentTableRow'
import ForumInputComment from '../ForumInputComment'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import getAvatarSrc from '../../../../helpers/getAvatarSrc'

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
  const [repliesAmount, setRepliesAmount] = useState(0)
  const [data, setData] = useState<ForumTopicData[]>([])
  const [expanded, setExpanded] = useState(false)

  const user = useAppSelector(state => state.user.user)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  function setCommentReplies() {
    const sendData: getCommentRepliesData = {
      offset: repliesAmount,
      limit: rowsPerPage,
    }

    if (replyId) {
      sendData.replyId = replyId
    }

    return getCommentReplies(commentId, sendData).then(responseData => {
      setData([...data, ...responseData])
      setRepliesAmount(repliesAmount + responseData.length)
    })
  }

  useEffect(() => {
    setCommentReplies()
  }, [])

  const tableRows = useMemo(
    () => (
      <ForumTopicCommentTableRow
        data={data}
        nestingLevel={nestingLevel}
        commentId={commentId}
      />
    ),
    [data]
  )

  const handleLoadMore = () => {
    setCommentReplies()
  }

  return (
    <div
      style={{
        width: `calc(100% - 7.5rem)`,
        minWidth: `25rem`,
        marginLeft: 'auto',
      }}>
      <Table className={styles.table}>
        <TableBody>
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            className={nestingLevel === 0 ? styles.tr : styles.tr_reply}>
            {forumTopicColumns.map(column => {
              const value = row[column.id]
              return (
                <TableCell
                  key={column.id}
                  className={clsx(
                    nestingLevel === 0 ? styles.tc : styles.tc_reply,
                    column.className ? styles[column.className] : ''
                  )}>
                  {value}
                </TableCell>
              )
            })}
          </TableRow>
        </TableBody>
      </Table>

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

      <Table className={clsx(styles.table, styles.comment_table)}>
        <TableBody>
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            className={styles.tr_reply}>
            {forumTopicColumns.map(column => {
              const value =
                column.id === 'content' ? (
                  <ForumInputComment
                    commentId={commentId}
                    replyId={replyId}
                    callback={() => setCommentReplies()}
                  />
                ) : (
                  <div className={styles.user}>
                    <Avatar
                      className={clsx(styles.avatar, styles.avatar_reply)}
                      alt={user.login}
                      src={getAvatarSrc(user.avatar)}
                    />
                  </div>
                )
              return (
                <TableCell
                  key={column.id}
                  className={clsx(
                    styles.tc_reply,
                    column.className ? styles[column.className] : ''
                  )}>
                  {value}
                </TableCell>
              )
            })}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
