import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import transition from '../../animation/transition'
import { ToastContainer, Slide } from 'react-toastify'

import Notice from '../../components/Notice'
import NewsBlock from '../../components/NewsBlock'
import Tracker from '../../components/Tracker'
import { finishUser } from '../../utils/request'
import news from '../../components/NewsContent/News'
import pn1 from '../../assets/notice/pn1.png'
import styles from './index.module.css'
import 'react-toastify/dist/ReactToastify.css'

function Home() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const notify = JSON.parse(localStorage.getItem('notify'))
  const orderNews = user.newsOrder.map((id) =>
    news.find((item) => item.id === id)
  )
  const [ack, setAck] = useState(false)
  const [tnum, setTum] = useState(0) // number of read articles
  const [formattedDate, setFormattedDate] = useState('') // date

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
    setTum(user.task.filter((task) => task === true).length)
  }, [user])

  useEffect(() => {
    const report = async () => {
      await finishUser(user.pid)
    }

    if (tnum >= 3) {
      report()
    }
  }, [tnum, user.pid])

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
        <div className={styles.tracker}>
          <Tracker num={tnum} />
        </div>
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
        <div className={styles.footer}>
          You have already seen all the news today.
        </div>
      </div>
    </div>
  )
}

export default transition(Home)
