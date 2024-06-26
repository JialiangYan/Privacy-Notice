import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import transition from '../../animation/transition'
import { ToastContainer, Slide } from 'react-toastify'

import { finishUser } from '../../utils/request'
import Notice from '../../components/Notice'
import NewsBlock from '../../components/NewsBlock'
import news from '../../components/NewsContent/News'
import pn1 from '../../assets/notice/pn1.png'
import styles from './index.module.css'

function Home() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const notify = JSON.parse(localStorage.getItem('notify'))
  const orderNews = user.newsOrder.map((id) =>
    news.find((item) => item.id === id)
  )
  const [ack, setAck] = useState(false)
  const [formattedDate, setFormattedDate] = useState('') // date
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

  // useEffects:
  useEffect(() => {
    // determine whether need to display notice
    let condition = JSON.parse(localStorage.getItem('user')).condition
    let displayNotice =
      condition === 5 || condition === 7 || condition === 8 || condition === 9
    if (notify.D1 || !displayNotice) {
      // don't need to display
      setAck(true)
    }
  }, [notify, user, navigate])

  useEffect(() => {
    // Get today's date
    const today = new Date()

    // Format date to display month and day
    const options = { month: 'long', day: 'numeric' }
    const newFormattedDate = today.toLocaleDateString('en-US', options)

    // Update state with the formatted date
    setFormattedDate(newFormattedDate)
  }, [])

  // functions
  const handleGet = () => {
    setAck(!ack)
    notify.D1 = true
    localStorage.setItem('notify', JSON.stringify(notify))
  }
  const handleBlockClick = (id) => {
    navigate(`/article/${id}`)
  }

  return (
    <div>
      {!ack ? (
        <>
          <Notice image={pn1} handleGet={handleGet} />
        </>
      ) : (
        <></>
      )}
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
      <div className={styles.main}>
        <div className={styles.title}>
          <div>News</div>
          <div className={styles.time}>{formattedDate}</div>
        </div>
        {orderNews.map((article, index) => (
          <div key={index}>
            <NewsBlock
              article={article}
              handleBlockClick={() => handleBlockClick(article.id)}
            />
          </div>
        ))}
        <div className={styles.footer}>-- End --</div>
      </div>
    </div>
  )
}

export default transition(Home)
