import { Typography } from '@mui/material'
import { clsx } from 'clsx'
import styles from './styles.module.scss'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import { useParams } from 'react-router-dom'
import MainTable from './Table'
import { useEffect, useState } from 'react'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'
import { getTopicInfo } from '../../api/basic/forum'
import Topic from './Topic'
import getAppliedXSS from '../../helpers/getAppliedXSS'

const Forum = () => {
  useLoggedInUser()
  const { topicId } = useParams()
  const [name, setName] = useState(topicId ? 'Topic' : 'Forum')

  useEffect(() => {
    if (topicId) {
      getTopicInfo(Number(topicId)).then(data => {
        setName(getAppliedXSS(data.name))
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
          {topicId ? <Topic /> : <MainTable />}
        </div>
      </div>
    </section>
  )
}

export default Forum
