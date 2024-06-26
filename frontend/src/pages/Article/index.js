import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { track } from '../../utils/request'
import transition from '../../animation/transition'
import Notice from '../../components/Notice'
import news from '../../components/NewsContent/News'

import { ToastContainer, Slide } from 'react-toastify'

import pn2 from '../../assets/notice/pn2.png'
import styles from './index.module.css'

function Article() {
  const navigate = useNavigate()
  const [ack, setAck] = useState(false)
  const notify = JSON.parse(localStorage.getItem('notify'))
  const user = JSON.parse(localStorage.getItem('user'))
  const [endTime, setEndTime] = useState(
    localStorage.getItem('time') ? new Date(localStorage.getItem('time')) : null
  )

  useEffect(() => {
    if (!endTime) {
      const startTime = new Date()
      //   console.log('Get now: ', startTime)
      const newEndTime = new Date(startTime.getTime() + 2 * 60000) // 2 minutes in milliseconds
      setEndTime(newEndTime)
      //   console.log('Set end: ', newEndTime)
      localStorage.setItem('time', newEndTime)
    }

    const report = async () => {
      await finishUser(user.pid)
    }

    const interval = setInterval(() => {
      if (endTime && new Date() >= endTime) {
        clearInterval(interval)
        report()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime, user])

  useEffect(() => {
    // determine whether need to display notice
    let condition = JSON.parse(localStorage.getItem('user')).condition
    let displayNotice =
      condition === 5 || condition === 7 || condition === 8 || condition === 9
    if (notify.D2 || !displayNotice) {
      // don't need to display
      setAck(true)
    }
  }, [notify])

  const handleGet = () => {
    setAck(!ack)
    notify.D2 = true
    localStorage.setItem('notify', JSON.stringify(notify))
  }

  const { id } = useParams()
  const article = news[id]

  // analytics
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpentOnPage((prevTime) => prevTime + 1000)
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const handleBack = async () => {
    await track(`Article${id}_Time`, { time: timeSpentOnPage }, user.pid)
    navigate('/home')
  }

  return (
    <>
      {!ack ? (
        <>
          <Notice image={pn2} handleGet={handleGet} />
        </>
      ) : (
        <></>
      )}
      <div className={styles.main}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="light"
          transition={Slide}
        />
        <div className={styles.topBar}>
          <div className={styles.bbtn} onClick={handleBack}>
            {'<'}
          </div>
          <div className={styles.name}>QuickNews</div>
        </div>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.info}>
          <div>{article.date}</div>
          <div>{article.author}</div>
        </div>
        <div className={styles.imaContainer}>
          <img className={styles.aimg} src={article.image} alt="" />
        </div>
        <div className={styles.text}>{article.component}</div>
      </div>
    </>
  )
}

export default transition(Article)
