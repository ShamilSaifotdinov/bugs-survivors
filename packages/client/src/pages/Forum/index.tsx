import { Typography } from '@mui/material'
import { clsx } from 'clsx'
import styles from './styles.module.scss'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import { useParams } from 'react-router-dom'
import ForumSubjectTable from './components/ForumSubjectTable'
import { useEffect, useState } from 'react'
import ForumTopicTable from './components/ForumTopicTable'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'
import { getTopicInfo } from '../../api/basic/forum'

const Forum = () => {
  useLoggedInUser()
  const { topicId } = useParams()
  const [name, setName] = useState(topicId ? 'Topic' : 'Forum')

  useEffect(() => {
    if (topicId) {
      getTopicInfo(Number(topicId)).then(data => {
        setName(data.name)
      })
    } else {
      setName('Forum')
    }
  }, [name, topicId])

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
          {topicId ? <ForumTopicTable /> : <ForumSubjectTable />}
        </div>
      </div>
    </section>
  )
}

export default Forum
