import { Avatar, TableCell, TableRow, Typography } from '@mui/material'
import { ForumSubjectData, forumSubjectColumns } from '../constants'
import getAvatarSrc from '../../../../helpers/getAvatarSrc'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

type IProps = {
  data: ForumSubjectData[]
}

function getTableRowsData(data: ForumSubjectData[]) {
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
          <Typography variant="body1">{item.creator.login}</Typography>
        </div>
      ),
    })) ?? []
  )
}

export default function ForumTableRow({ data }: IProps) {
  const navigate = useNavigate()

  return getTableRowsData(data).map(row => {
    return (
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.id}
        className={styles.tr}
        onClick={() => navigate(`/forum/${row.id}`)}>
        {forumSubjectColumns.map(column => {
          const value = row[column.id]
          return (
            <TableCell
              key={column.id}
              className={clsx(
                styles.tc,
                column.bodyClassName ? styles[column.bodyClassName] : ''
              )}>
              {value}
            </TableCell>
          )
        })}
      </TableRow>
    )
  })
}
