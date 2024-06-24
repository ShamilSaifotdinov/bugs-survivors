import { Avatar, Typography } from '@mui/material'
import { TopicData } from '../../constants'
import getAvatarSrc from '../../../../helpers/getAvatarSrc'
import styles from './styles.module.scss'
import clsx from 'clsx'
import CommentTable from '.'

type IProps = {
  data: TopicData[]
  nestingLevel: number
  commentId: number
}

function getTableTopicCommentRowsData(data: TopicData[], nestingLevel: number) {
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

export default function Row({ data, nestingLevel, commentId }: IProps) {
  return getTableTopicCommentRowsData(data, nestingLevel).map(row => (
    <CommentTable
      key={row.id}
      replyId={row.id}
      commentId={commentId}
      row={row}
      nestingLevel={nestingLevel + 1}
    />
  ))
}
