import styles from './styles.module.scss'
import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableRow,
} from '@mui/material'
import mockData from '../../../../../mockData.json'
import { useNavigate } from 'react-router-dom'

type Data = {
  forum: string
  topic_count: number
  answers_count: number
}

type Column = {
  id: keyof Data
  label: string
  minWidth?: number
  align?: TableCellProps['align']
}

const columns: readonly Column[] = [
  { id: 'forum', label: 'FORUM' },
  { id: 'topic_count', label: 'TOPIC COUNT', align: 'right' },
  { id: 'answers_count', label: 'ANSWERS COUNT', align: 'right' },
]

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
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    borderBottom: '1px solid #fff',
                  }}>
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
                  {columns.map(column => {
                    const value = row[column.id]
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ borderBottom: '1px solid #fff' }}>
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
