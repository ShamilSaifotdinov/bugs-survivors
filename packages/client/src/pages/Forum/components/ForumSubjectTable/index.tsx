import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import mockData from '../../../../../mockData.json'
import { useNavigate, useParams } from 'react-router-dom'
import { clsx } from 'clsx'
import { forumSubjectColumns } from '../constants'

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
      <div className={styles.button_container}>
        <Button variant="contained" className={styles.create_topic_button}>
          CREATE TOPIC
        </Button>
      </div>
      <div className={styles.table}>
        <Table>
          <TableHead>
            <TableRow className={styles.tr}>
              {forumSubjectColumns.map(column => (
                <TableCell
                  key={column.id}
                  className={clsx(
                    styles.tc,
                    column.headerClassName ? styles[column.headerClassName] : ''
                  )}>
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
                    {forumSubjectColumns.map(column => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          key={column.id}
                          className={clsx(
                            styles.tc,
                            column.bodyClassName
                              ? styles[column.bodyClassName]
                              : ''
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
