import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const Clue = () => {
  return <Link to={'/guide'} className={styles.clue} />
}

export default Clue
