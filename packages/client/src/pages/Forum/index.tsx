import { Typography } from '@mui/material'
import { clsx } from 'clsx'
import styles from './styles.module.scss'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import ForumTable from './components/ForumTable'
import { useParams } from 'react-router-dom'
import mockData from '../../../mockData.json'
import ForumSubjectTable from './components/ForumSubjectTable'
import { useEffect } from 'react'
import ForumTopicTable from './components/ForumTopicTable'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'

const Forum = () => {
  useLoggedInUser()
  const { forumId, topicId } = useParams()

  useEffect(() => {
    fetch('/api/testUsers')
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }, [])

  const name = topicId
    ? mockData.forum
        .find(item => item.id === forumId)
        ?.data.find(topicItem => topicItem.id === topicId)?.name
    : forumId
    ? mockData.forum.find(item => item.id === forumId)?.name
    : 'Forum'

  useEffect(() => {
    if (!name) {
      throw new Error('Not found')
    }
  }, [])

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <div className={styles.wrapper}>
          <div className={styles.header_container}>
            <Typography variant="h2">
              <PreviousPageBtn />
              {name}
            </Typography>
          </div>
          {topicId ? (
            <ForumTopicTable />
          ) : forumId ? (
            <ForumSubjectTable />
          ) : (
            <ForumTable />
          )}
        </div>
      </div>
    </section>
  )
}

export default Forum
