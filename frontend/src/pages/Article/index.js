import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { track } from '../../utils/request'
import transition from '../../animation/transition'
import Notice from '../../components/Notice'
import news from '../../components/NewsContent/News'

import { ToastContainer, Slide, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import pn2 from '../../assets/notice/pn2.png'
import styles from './index.module.css'

function Article() {
  const navigate = useNavigate()
  const [ack, setAck] = useState(false)
  const notify = JSON.parse(localStorage.getItem('notify'))
  const user = JSON.parse(localStorage.getItem('user'))

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
    console.log('Time spent on page:', timeSpentOnPage)
    if (timeSpentOnPage > 40000) {
      // 40 seconds
      if (user) {
        user.task[id] = true
        console.log(user)
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        console.error('User not found in localStorage')
      }
      await track(`Article${id}_Time`, { time: timeSpentOnPage }, user.pid)
      navigate('/home')
    } else {
      toast(
        `Sorry, You have to read for at least 40 seconds. You have already read for ${
          timeSpentOnPage / 1000
        } seconds`
      )
    }
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
        <img className={styles.aimg} src={article.image} alt="" />
        <div className={styles.text}>{article.component}</div>
      </div>
    </>
  )
}

export default transition(Article)
