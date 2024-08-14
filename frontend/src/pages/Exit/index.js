import { useEffect } from 'react'
import withAuthorization from '../../utils/withAuthorization'
import transition from '../../animation/transition'
import styles from './index.module.css'

function Exit() {
  useEffect(() => {
    localStorage.setItem('prestate', `/exit`)
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.title1}>
        Thank you for your time. Now you can exit the study by simply closing
        this website.
      </div>
    </div>
  )
}

export default withAuthorization(transition(Exit))
