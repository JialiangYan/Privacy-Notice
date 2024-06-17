import React from 'react'
import { useNavigate } from 'react-router-dom'
import transition from '../../animation/transition'
import styles from './index.module.css'

function Instruct() {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/appstore')
  }

  return (
    <div className={styles.main}>
      <div className={styles.title1}>Study Instruction</div>
      <div className={styles.form}>
        <p>
          You will be directed into the app store page of a news app called
          "QuickNews".{' '}
          <strong>
            Please imagine that you want to install this app on your iPhone and
            use it
          </strong>
          .
        </p>
        <p>
          Once you install and open the news app, you will need to read{' '}
          <strong>3 </strong>
          different news articles to complete the usage task.
        </p>
        <p>
          After completing the installation and usage task, you will answer the
          post-study questionnaire.
        </p>
        <p>Note: All these activities will take place in your browser.</p>
        <form onSubmit={handleSubmit}>
          <button type="submit" className={styles.btn}>
            Start the Study
          </button>
        </form>
      </div>
    </div>
  )
}

export default transition(Instruct)
