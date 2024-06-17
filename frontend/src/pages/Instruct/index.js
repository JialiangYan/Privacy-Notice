import React, { useState } from 'react'
import { useUser } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import transition from '../../animation/transition'
import { createUser } from '../../utils/request'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import throttle from 'lodash/throttle'

import styles from './index.module.css'

function Instruct() {
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = useState(false)

  // get Proprofic id
  const { userId } = useUser()

  // functions
  const throttledSubmit = throttle(async () => {
    if (isSubmitted) return
    toast.promise(
      async () => {
        await createUser(userId, navigate)
      },
      {
        pending: 'Loading...',
      }
    )
    setIsSubmitted(true)
  }, 10000)

  const onSubmit = (e) => {
    e.preventDefault()
    throttledSubmit()
  }

  return (
    <div className={styles.main}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
        transition={Slide}
      />
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
        <form onSubmit={onSubmit}>
          <button type="submit" className={styles.btn}>
            Start the Study
          </button>
        </form>
      </div>
    </div>
  )
}

export default transition(Instruct)
