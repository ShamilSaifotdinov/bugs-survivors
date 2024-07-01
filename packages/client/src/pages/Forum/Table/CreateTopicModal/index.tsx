import { useState } from 'react'
import styles from './styles.module.scss'
import { Button, FormHelperText, TextField } from '@mui/material'
import ButtonModal from '../../../../components/ButtonModal/ButtonModal'
import { createTopic } from '../../../../api/basic/forum'
import { useAppSelector } from '../../../../hooks/reduxHooks'

interface IProps {
  callback: () => Promise<void>
}

export default function CreateTopicModal({ callback }: IProps) {
  const [newTopicName, setNewTopicName] = useState('')
  const [createTopicError, setCreateTopicError] = useState('')

  const user = useAppSelector(state => state.user.user)

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleCreateTopic = () => {
    if (newTopicName !== '') {
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
          callback()
        })
        .catch(error => setCreateTopicError(error.message))
    }
  }

  return (
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
  )
}
