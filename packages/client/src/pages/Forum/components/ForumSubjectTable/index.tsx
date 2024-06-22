import { ChangeEvent, useEffect, useMemo, useState, useTransition } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'
import { ForumSubjectData, forumSubjectColumns } from '../constants'
import ButtonModal from '../../../../components/ButtonModal/ButtonModal'
import {
  createTopic,
  getTopics,
  getTopicsAmount,
} from '../../../../api/basic/forum'
import { useAppSelector } from '../../../../hooks/reduxHooks'

function getTableRowsData(data: ForumSubjectData[]) {
  return (
    data.map(item => ({
      ...item,
      creator: (
        <div className={styles.user}>
          <Avatar
            className={styles.avatar}
            alt={item.creator.login}
            src={item.creator.avatar}
          />
          <Typography variant="body1">{item.creator.login}</Typography>
        </div>
      ),
    })) ?? []
  )
}

export default function ForumSubjectTable() {
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [topicsAmount, setTopicsAmount] = useState(0)
  const [data, setData] = useState<ForumSubjectData[]>([])
  const [newTopicName, setNewTopicName] = useState('')

  const user = useAppSelector(state => state.user.user)

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleCreateTopic = () => {
    createTopic({
      name: newTopicName,
      creator: {
        id: user.id,
        login: user.login,
        avatar: user.avatar,
      },
    }).then(() => {
      setNewTopicName('')
      setOpen(false)
      setTopics().then(() => setTopicsAmount(topicsAmount + 1))
    })
  }

  function setTopics() {
    return getTopics(page * rowsPerPage, page * rowsPerPage + rowsPerPage).then(
      data => {
        setData(data)
      }
    )
  }

  useEffect(() => {
    getTopicsAmount().then(data => {
      setTopicsAmount(data.count)
    })
  }, [])

  useEffect(() => {
    setTopics()
  }, [page, rowsPerPage])

  const tableRows = useMemo(
    () =>
      getTableRowsData(data).map(row => {
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
      }),
    [data, navigate]
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
        <title>Форум</title>
        <meta name="description" content={'Форум'} />
      </Helmet>
      <div className={styles.button_container}>
        <ButtonModal
          variant="contained"
          label="CREATE TOPIC"
          color="secondary"
          open={open}
          handleOpen={() => setOpen(true)}
          handleClose={handleClose}>
          <TextField
            label="Name"
            value={newTopicName}
            onChange={event => setNewTopicName(event.target.value)}
          />
          <div className={styles.create_btns}>
            <Button variant="contained" onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleCreateTopic} variant="contained">
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
        count={topicsAmount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
