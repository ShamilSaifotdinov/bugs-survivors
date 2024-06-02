import { ChangeEvent, useMemo, useState, useTransition } from 'react'
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
  TextField,
  Typography,
} from '@mui/material'
import { Helmet } from 'react-helmet'
import mockData from '../../../../../mockData.json'
import { useNavigate, useParams } from 'react-router-dom'
import { clsx } from 'clsx'
import { forumSubjectColumns } from '../constants'
import ButtonModal from '../../../../components/ButtonModal/ButtonModal'

export default function ForumSubjectTable() {
  const [isPending, startTransition] = useTransition()
  const { forumId } = useParams()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const forumData = mockData?.forum.find(item => item.id === forumId)

  const tableRowsData =
    forumData?.data?.map(item => ({
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

  const tableRows = useMemo(
    () =>
      tableRowsData
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
                      column.bodyClassName ? styles[column.bodyClassName] : ''
                    )}>
                    {value}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        }),
    [page, rowsPerPage]
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    startTransition(() => {
      setPage(newPage)
    })
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    })
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{forumData?.name}</title>
        <meta name="description" content={forumData?.name} />
      </Helmet>
      <div className={styles.button_container}>
        <ButtonModal
          variant="contained"
          label="CREATE TOPIC"
          color="secondary"
          open={open}
          handleOpen={() => setOpen(true)}
          handleClose={handleClose}>
          <TextField label="Name"></TextField>
          <div className={styles.create_btns}>
            <Button variant="contained" onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleClose} variant="contained">
              CREATE
            </Button>
          </div>
        </ButtonModal>
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
          <TableBody>{tableRows}</TableBody>
        </Table>
      </div>
      <TablePagination
        className={styles.pagination}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableRowsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
