import { ChangeEvent, useEffect, useMemo, useState, useTransition } from 'react'
import styles from './styles.module.scss'
import {
  Button,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material'
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
import ForumMetaData from '../ForumMetaData'
import ForumTableRow from './ForumTableRow'

export default function ForumSubjectTable() {
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [topicsAmount, setTopicsAmount] = useState(0)
  const [data, setData] = useState<ForumSubjectData[]>([])
  const [newTopicName, setNewTopicName] = useState('')
  const [createTopicError, setCreateTopicError] = useState('')

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
    })
      .then(() => {
        setCreateTopicError('')
        setNewTopicName('')
        setOpen(false)
        setTopics().then(() => setTopicsAmount(topicsAmount + 1))
      })
      .catch(error => setCreateTopicError(error.message))
  }

  function setTopics() {
    const sendData = {
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    }
    return getTopics(sendData).then(data => {
      setData(data)
    })
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
    () => <ForumTableRow data={data} />,
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
      <ForumMetaData title="Forum" />
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
          <FormHelperText
            children={createTopicError}
            error={!!createTopicError.length}
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
