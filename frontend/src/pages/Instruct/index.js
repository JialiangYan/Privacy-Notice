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
          The task we would like you to perform is to imagine you are installing
          our app on your iphone.
        </p>
        <p>
          Our site will go through the steps of installation and use.
          Afterwards, we will be asking you questions about how well you thought
          the app functions. Therefore we would like you to click through{' '}
          <strong>three</strong> different news articles to ensure you have
          experienced what using the app is like.
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

export default transition(Instruct)
