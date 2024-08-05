import { useEffect, useState, startTransition } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { track } from '../../utils/request'
import transition from '../../animation/transition'
import Notice from '../../components/Notice'
import news from '../../components/NewsContent/News'
import CustomToast from '../../components/CustomToast'
import withAuthorization from '../../utils/withAuthorization'

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
  const startTimeD2 = Date.now()

  // Scroll to top
  const { pathname } = useLocation()
  useEffect(() => {
    const element = document.getElementById('newsContentTop')
    if (element) {
      element.scrollIntoView({ behavior: 'instant' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  useEffect(() => {
    if (!endTime) {
      const startTime = new Date()
      //   console.log('Get now: ', startTime)
      const newEndTime = new Date(startTime.getTime() + 2 * 60000) // 2 minutes in milliseconds
      setEndTime(newEndTime)
      //   console.log('Set end: ', newEndTime)
      localStorage.setItem('time', newEndTime)
    }

    const interval = setInterval(() => {
      if (endTime && new Date() >= endTime && notify.D1 && notify.D2) {
        clearInterval(interval)
        toast('You have finished the user study.')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime, user])

  useEffect(() => {
    // determine whether need to display notice
    if (notify.D2) {
      // don't need to display
      setAck(true)
    }
  }, [notify])

  const handleGet = () => {
    startTransition(async () => {
      await track('Notice_D2', { time: Date.now() - startTimeD2 }, user.pid)
    })
    setAck(!ack)
    notify.D2 = true
    localStorage.setItem('notify', JSON.stringify(notify))
  }

  const { id } = useParams()
  const article = news[id]

  useEffect(() => {
    localStorage.setItem('prestate', `/quicknews/article/:${id}`)
  }, [])

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

  const handleBack = () => {
    startTransition(async () => {
      await track(`Article${id}`, { time: timeSpentOnPage }, user.pid)
    })
    navigate('/quicknews/home', { state: { valid: true } })
  }

  return (
    <div>
      {!ack ? (
        <div>
          <Notice image={pn2} handleGet={handleGet} />
        </div>
      ) : (
        <div></div>
      )}
      <CustomToast />
      <div className={styles.main}>
        <div className={styles.topBar} id="newsContentTop">
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
    </div>
  )
}

export default withAuthorization(transition(Article))
