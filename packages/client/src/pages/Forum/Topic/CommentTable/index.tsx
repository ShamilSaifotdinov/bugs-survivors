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
  Typography,
} from '@mui/material'
import { clsx } from 'clsx'
import { TopicData, topicColumns } from '../../constants'
import { getCommentReplies } from '../../../../api/basic/forum'
import { TopicRowDataType } from '..'
import { getCommentRepliesData } from '../../../../api/basic/forum/types'
import Input from './Input'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import getAvatarSrc from '../../../../helpers/getAvatarSrc'

function getCommentRowData(data: TopicData[], nestingLevel: number) {
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
            src={getAvatarSrc(item.creator.avatar)}
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
  row: TopicRowDataType
  nestingLevel: number
}

export default function CommentTable({
  replyId,
  commentId,
  row,
  nestingLevel,
}: IProps) {
  const rowsPerPage = 10
  const [repliesAmount, setRepliesAmount] = useState(0)
  const [data, setData] = useState<TopicData[]>([])
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
    () =>
      getCommentRowData(data, nestingLevel).map(row => (
        <CommentTable
          key={row.id}
          replyId={row.id}
          commentId={commentId}
          row={row}
          nestingLevel={nestingLevel + 1}
        />
      )),
    [data]
  )

  const handleLoadMore = () => {
    setCommentReplies()
  }

  return (
    <div
      style={{
        minWidth: `25rem`,
        marginLeft: 'auto',
      }}>
      <Table>
        <TableBody>
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            className={nestingLevel === 0 ? styles.tr : styles.tr_reply}>
            {topicColumns.map(column => {
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
        {row.replies_count} replies ▼
      </Button>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        className={styles.collapse_content}>
        {tableRows}

        {row.replies_count - repliesAmount > 0 && (
          <Button
            onClick={handleLoadMore}
            color="secondary"
            className={styles.collapse}>
            {row.replies_count - repliesAmount} more replies ▼
          </Button>
        )}

        <Table className={clsx(styles.table, styles.comment_table)}>
          <TableBody>
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              className={styles.tr_reply}>
              {topicColumns.map(column => {
                const value =
                  column.id === 'content' ? (
                    <Input
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
      </Collapse>
    </div>
  )
}
