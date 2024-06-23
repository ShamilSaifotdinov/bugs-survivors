import { Avatar, Typography } from '@mui/material'
import { ForumTopicData } from '../constants'
import getAvatarSrc from '../../../../helpers/getAvatarSrc'
import styles from './styles.module.scss'
import { ForumTopicTableRowDataType } from '.'
import ForumTopicCommentTable from '../ForumTopicCommentTable'

type IProps = {
  data: ForumTopicData[]
}

function getTableRowsData(
  data: ForumTopicData[]
): ForumTopicTableRowDataType[] {
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

export default function ForumTopicTableRow({ data }: IProps) {
  return getTableRowsData(data).map(row => (
    <ForumTopicCommentTable
      key={row.id}
      commentId={row.id}
      row={row}
      nestingLevel={0}
    />
  ))
}
