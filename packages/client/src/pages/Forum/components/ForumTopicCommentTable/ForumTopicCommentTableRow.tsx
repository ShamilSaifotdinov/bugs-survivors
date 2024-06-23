import { Avatar, Typography } from '@mui/material'
import { ForumTopicData } from '../constants'
import getAvatarSrc from '../../../../helpers/getAvatarSrc'
import styles from './styles.module.scss'
import clsx from 'clsx'
import ForumTopicCommentTable from '.'

type IProps = {
  data: ForumTopicData[]
  nestingLevel: number
  commentId: number
}

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

export default function ForumTopicCommentTableRow({
  data,
  nestingLevel,
  commentId,
}: IProps) {
  return getTableTopicCommentRowsData(data, nestingLevel).map(row => (
    <ForumTopicCommentTable
      key={row.id}
      replyId={row.id}
      commentId={commentId}
      row={row}
      nestingLevel={nestingLevel + 1}
    />
  ))
}
