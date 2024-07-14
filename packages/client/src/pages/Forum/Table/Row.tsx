import { TableCell, TableRow } from '@mui/material'
import { forumColumns } from '../constants'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { RowDataType } from '.'
import getAppliedXSS from '../../../helpers/getAppliedXSS'

type IProps = {
  row: RowDataType
}

export default function Row({ row }: IProps) {
  const navigate = useNavigate()

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      className={styles.tr}
      onClick={() => navigate(`/forum/${row.id}`)}>
      {forumColumns.map(column => {
        const value = row[column.id]
        return (
          <TableCell
            key={column.id}
            className={clsx(
              styles.tc,
              column.bodyClassName ? styles[column.bodyClassName] : ''
            )}>
            {getAppliedXSS(value)}
          </TableCell>
        )
      })}
    </TableRow>
  )
}
