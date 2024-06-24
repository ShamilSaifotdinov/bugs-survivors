import { ChangeEvent, useEffect, useMemo, useState, useTransition } from 'react'
import styles from './styles.module.scss'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'
import { ForumData, forumColumns } from '../constants'
import { getTopics, getTopicsAmount } from '../../../api/basic/forum'
import MetaData from '../MetaData'
import Row from './Row'
import CreateTopicModal from './CreateTopicModal'

export default function MainTable() {
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [topicsAmount, setTopicsAmount] = useState(0)
  const [data, setData] = useState<ForumData[]>([])

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
    () => (
      <>
        <Row data={data} />
      </>
    ),
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
      <MetaData title="Forum" />
      <CreateTopicModal
        callback={() =>
          setTopics().then(() => setTopicsAmount(topicsAmount + 1))
        }
      />
      <div className={styles.table}>
        <Table>
          <TableHead>
            <TableRow className={styles.tr}>
              {forumColumns.map(column => (
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
