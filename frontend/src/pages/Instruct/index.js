import { startTransition, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import withAuthorization from '../../utils/withAuthorization'
import transition from '../../animation/transition'
import styles from './index.module.css'

function Instruct() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('prestate', '/inst')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    startTransition(() => {
      navigate('/appstore', { state: { valid: true } })
    })
  }

  return (
    <div className={styles.main}>
      <div className={styles.title1}>Study Instruction</div>
      <div className={styles.form}>
        <p>
          Thank you for agreeing to participate in our study. The task we would
          like you to perform is to imagine you are installing our news app on
          your iPhone.
        </p>
        <p>
          Our site will go through the steps of installation and use. You will
          have <strong>two minutes</strong> to interact with the app. After the
          period, you will be redirected to a questionnaire to provide feedback
          on how well you thought the app functions.
        </p>
        <p>
          During the two minutes,{' '}
          <strong>
            please select and read the news articles you are interested in.
          </strong>{' '}
          This will help us ensure that you have experienced what using the app
          is like.
        </p>
        <form onSubmit={handleSubmit}>
          <p>
            You will be directed into the app store page of our news app called
            "QuickNews".
          </p>
          <button type="submit" className={styles.btn}>
            Start the Study
          </button>
        </form>
      </div>
    </div>
  )
}

export default withAuthorization(transition(Instruct))
