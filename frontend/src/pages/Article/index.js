import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { track } from '../../utils/request'
import transition from '../../animation/transition'
import Notice from '../../components/Notice'
import styles from './index.module.css'
import A1 from './A1'
import A2 from './A2'
import A3 from './A3'

import { ToastContainer, Slide, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import data from '../../assets/app/data.json'
import img1 from '../../assets/app/news1.png'
import img2 from '../../assets/app/news1.png'
import img3 from '../../assets/app/news1.png'
import pn2 from '../../assets/notice/pn2.png'

function Article() {
  const navigate = useNavigate()
  const [ack, setAck] = useState(false)
  const notify = JSON.parse(localStorage.getItem('notify'))
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    // determine whether need to display notice
    let condition = JSON.parse(localStorage.getItem('user')).condition
    let displayNotice =
      condition === 6 || condition === 8 || condition === 9 || condition === 10
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
  const { title, image, source, date } = data[id]
  const imgs = [img1, img2, img3]
  const articles = [A1, A2, A3]

  // analytics
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpentOnPage((prevTime) => prevTime + 1000) // increment by 1 second
    }, 1000) // every 1 second
    return () => {
      clearInterval(intervalId)
    } // cleanup
  }, [])

  const handleBack = async () => {
    // alert('Alert Click')
    console.log('Time spent on page:', timeSpentOnPage)
    if (timeSpentOnPage > 90000) {
      // for testing convience
      localStorage.setItem(
        'tnum',
        JSON.stringify(JSON.parse(localStorage.getItem('tnum')) + 1)
      )
      await track(`Article${id}_Time`, { time: timeSpentOnPage }, user.pid)
      navigate('/home')
    } else {
      // alert('Enter else')
      toast(
        `Sorry, You have to read for at least 90 seconds. You have already read for ${
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
