import { useEffect, useState, useRef, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { track } from '../../utils/request'
import transition from '../../animation/transition'
import Notice from '../../components/Notice'
import styles from './index.module.css'
import A1 from './A1'
import A2 from './A2'
import A3 from './A3'

import data from '../../assets/app/data.json'
import img1 from '../../assets/app/news1.png'
import img2 from '../../assets/app/news1.png'
import img3 from '../../assets/app/news1.png'
import pn2 from '../../assets/notice/pn2.png'

function Article() {
  const navigate = useNavigate()
  const [ack, setAck] = useState(false)
  const condition = localStorage.getItem('condition')
  const notify = localStorage.getItem('notify')

  useEffect(() => {
    if (notify.articleNotice) {
      // already notified
      setAck(true)
    }
  }, [])

  const handleGet = () => {
    setAck(!ack)
    notify.articleNotice = true
    localStorage.setItem('notify', JSON.stringify(notify))
  }

  const { id } = useParams()
  const { title, image, source, date } = data[id]
  const imgs = [img1, img2, img3]
  const articles = [A1, A2, A3]
  const handleBack = () => {
    navigate('/home')
  }

  // Track reading time
  // analytics
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpentOnPage((prevTime) => prevTime + 1000) // increment by 1 second
    }, 1000) // every 1 second
    return async () => {
      try {
        const prolificPid = localStorage.getItem('pid')
        await track('ConsentFormTime', timeSpentOnPage, prolificPid)
      } catch (error) {
        console.error('Error creating user:', error)
      }
      clearInterval(intervalId)
    } // cleanup
  }, [])

  const startTimeRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('tnum', localStorage.getItem('tnum') + 1)
  }, [])

  useEffect(() => {
    // Set start time once when the component mounts
    startTimeRef.current = Date.now()

    return () => {
      if (startTimeRef.current !== null) {
        const endTime = Date.now()
        const timeSpent = endTime - startTimeRef.current
        console.log(`Time spent on page: ${timeSpent / 1000} seconds`)
      }
    }
  }, [])

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
        <div className={styles.topBar}>
          <div className={styles.bbtn} onClick={handleBack}>
            {'<'}
          </div>
          <div className={styles.name}>QuickNews</div>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <div>{date}</div>
          <div>{source}</div>
        </div>
        <img className={styles.aimg} src={imgs[image]} alt="" />
        <div className={styles.text}>{articles[id]}</div>
      </div>
    </>
  )
}

export default transition(Article)
