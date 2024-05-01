import styles from './styles.module.scss'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import mockData from '../../../../../mockData.json'
import { useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'
import { forumColumns } from '../constants'

const tableRows = mockData?.forum?.map(item => ({
  id: item.id,
  forum: item.name,
  topic_count: item.data.length,
  answers_count: item.data.reduce((acc, forum_item) => {
    acc += forum_item.answers.length
    return acc
  }, 0),
}))

export default function ForumTable() {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles.table}>
        <Table>
          <TableHead>
            <TableRow className={styles.tr}>
              {forumColumns.map(column => (
                <TableCell
                  key={column.id}
                  className={clsx(
                    styles.tc,
                    column.className ? styles[column.className] : ''
                  )}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map(row => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.forum}
                  className={styles.tr}
                  onClick={() => navigate(`/forum/${row.id}`)}>
                  {forumColumns.map(column => {
                    const value = row[column.id]
                    return (
                      <TableCell
                        key={column.id}
                        className={clsx(
                          styles.tc,
                          column.className ? styles[column.className] : ''
                        )}>
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
