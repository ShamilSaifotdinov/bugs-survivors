import React, { ReactNode, ChangeEvent, useState, useEffect } from 'react'
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
import {
  leaderboardPost,
  getLeaderboard,
} from '../../../../api/basic/leaderboard'
import convertSeconds from '../../../../helpers/convertSeconds'
import getAvatarSrc from '../../../../helpers/getAvatarSrc'

type User = {
  id: string
  avatar: string
  name: string
}

type LeaderboardEntry = {
  position: string
  user: User
  time: string
  score: number
}

type Column = {
  id: keyof LeaderboardEntry
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => ReactNode
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

type formattedData = {
  position: number
  user: {
    avatar: string | undefined
    name: string
  }
  time: string
  score: number
}

export default function LeaderboardTable() {
  const [mockData, setMockData] = useState<{ leaderboard: formattedData[] }>({
    leaderboard: [],
  })

  const tableRows = mockData.leaderboard.map(item => ({
    ...item,
    user: (
      <div className={styles.user}>
        <Avatar
          className={styles.avatar}
          alt={item.user.name}
          src={getAvatarSrc(item.user.avatar)}
        />
        <Typography variant="body1">{item.user.name}</Typography>
      </div>
    ),
  }))

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    getLeaderboard('StathamGames', page, rowsPerPage).then(response => {
      const filteredData = response.filter(
        item =>
          item.data.name &&
          item.data.score !== undefined &&
          item.data.seconds !== undefined &&
          item.data.avatar !== undefined
      )

      const formattedData: formattedData[] = filteredData.map(
        (item, index) => ({
          position: index + 1,
          user: {
            avatar: item.data.avatar,
            name: item.data.name!,
          },
          time: convertSeconds(item.data.seconds!),
          score: item.data.score || 0,
        })
      )

      setMockData({ leaderboard: formattedData })
    })
  }, [page, rowsPerPage])

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
              .map(row => (
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
              ))}
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
