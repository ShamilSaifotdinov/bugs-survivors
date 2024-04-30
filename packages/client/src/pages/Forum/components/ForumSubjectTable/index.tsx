import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import mockData from '../../../../../mockData.json'
import { useNavigate, useParams } from 'react-router-dom'

type User = {
  id: string
  avatar: string
  name: string
}

type Data = {
  name: string
  creator: User
  answers_count: number
}

type Column = {
  id: keyof Data
  label: string
  minWidth?: number
  align?: TableCellProps['align']
}

const columns: readonly Column[] = [
  { id: 'name', label: 'NAME' },
  { id: 'creator', label: 'CREATOR', align: 'center' },
  { id: 'answers_count', label: 'ANSWERS COUNT', align: 'right' },
]

export default function ForumSubjectTable() {
  const { forumId } = useParams()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const tableRows =
    mockData?.forum
      .find(item => item.id === forumId)
      ?.data?.map(item => ({
        id: item.id,
        name: item.name,
        creator: (
          <div className={styles.user}>
            <Avatar
              className={styles.avatar}
              alt={item.creator.name}
              src={item.creator.avatar}
            />
            <Typography variant="body1">{item.creator.name}</Typography>
          </div>
        ),
        answers_count: item.answers.length,
      })) ?? []

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
            {tableRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    className={styles.tr}
                    onClick={() => navigate(`/forum/${forumId}/${row.id}`)}>
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
