import { Avatar, Typography } from '@mui/material'
import getAvatarSrc from '../../../helpers/getAvatarSrc'
import styles from './styles.module.scss'
import { ForumTopicTableRowDataType } from '.'
import CommentTable from './CommentTable'
import { TopicData } from '../constants'

type IProps = {
  data: TopicData[]
}

function getTableRowsData(data: TopicData[]): ForumTopicTableRowDataType[] {
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

export default function Row({ data }: IProps) {
  return getTableRowsData(data).map(row => (
    <CommentTable key={row.id} commentId={row.id} row={row} nestingLevel={0} />
  ))
}
