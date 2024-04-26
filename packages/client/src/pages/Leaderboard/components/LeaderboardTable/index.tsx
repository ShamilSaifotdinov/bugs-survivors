import { ReactNode, ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import mockData from '@bugs-survivors/mockData'
import { logDOM } from '@testing-library/react'

type User = {
  id: string
  avatar: string
  name: string
}
type Data = {
  position: string
  user: User
  time: string
  score: number
}

type Column = {
  id: keyof Data
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: User) => ReactNode
}

const columns: readonly Column[] = [
  { id: 'position', label: 'Position' },
  {
    id: 'user',
    label: 'User',
  },
  {
    id: 'time',
    label: 'Time',
  },
  {
    id: 'score',
    label: 'Score',
    align: 'right',
  },
]

console.log(mockData)

const tableRows = mockData.leaderboard.map((item: any) => ({
  ...item,
  user: (
    <div className={styles.user}>
      <Avatar
        className={styles.avatar}
        alt={item.user.name}
        src={item.user.avatar}
      />
      <Typography variant="body1">{item.user.name}</Typography>
    </div>
  ),
}))

export default function LeaderboardTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

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
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.position}>
                    {columns.map(column => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
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
      <TablePagination
        className={styles.pagination}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
