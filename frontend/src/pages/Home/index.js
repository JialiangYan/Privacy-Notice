import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import transition from '../../animation/transition'
import Notice from '../../components/Notice'
import NewsBlock from '../../components/NewsBlock'
import Tracker from '../../components/Tracker'
import { finishUser } from '../../utils/request'
import { ToastContainer, Slide } from 'react-toastify'

import data from '../../assets/app/data.json'
import pn1 from '../../assets/notice/pn1.png'

import styles from './index.module.css'
import 'react-toastify/dist/ReactToastify.css'

function Home() {
  const navigate = useNavigate()
  const tnum = localStorage.getItem('tnum')
  const user = JSON.parse(localStorage.getItem('user'))
  const notify = JSON.parse(localStorage.getItem('notify'))
  const [ack, setAck] = useState(false)

  useEffect(() => {
    // determine whether need to display notice
    let condition = JSON.parse(localStorage.getItem('user')).condition
    let displayNotice =
      condition === 6 || condition === 8 || condition === 9 || condition === 10
    if (notify.D1 || !displayNotice) {
      // don't need to display
      setAck(true)
    }
  }, [notify, navigate])

  useEffect(() => {
    async function report() {
      if (tnum >= 3) {
        await finishUser(user.pid)
      }
    }
    report()
  }, [tnum, user])

  // get date
  const [formattedDate, setFormattedDate] = useState('')
  useEffect(() => {
    // Get today's date
    const today = new Date()

    // Format date to display month and day
    const options = { month: 'long', day: 'numeric' }
    const newFormattedDate = today.toLocaleDateString('en-US', options)

    // Update state with the formatted date
    setFormattedDate(newFormattedDate)
  }, [])

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
        {data.map((article, index) => (
          <div key={index}>
            <NewsBlock
              article={article}
              handleBlockClick={() => handleBlockClick(index)}
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
