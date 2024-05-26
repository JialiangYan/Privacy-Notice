import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import transition from '../../animation/transition'
import Modal from '../../components/Modal'
import Notice from '../../components/Notice'
import NewsBlock from '../../components/NewsBlock'
import Tracker from '../../components/Tracker'
import { finishUser } from '../../utils/request'

import exit from '../../assets/notice/exitmodel.png'
import data from '../../assets/app/data.json'
import pn1 from '../../assets/notice/pn1.png'

import styles from './index.module.css'

function Home() {
  const navigate = useNavigate()
  const tnum = localStorage.getItem('tnum')
  const user = JSON.parse(localStorage.getItem('user'))
  const notify = JSON.parse(localStorage.getItem('notify'))
  const [ack, setAck] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/error')
    }
  }, [navigate])

  useEffect(() => {
    // determine whether need to display notice
    let condition = JSON.parse(localStorage.getItem('user')).condition
    let displayNotice =
      condition === 6 || condition === 8 || condition === 9 || condition === 10
    if (notify.D1 || !displayNotice) {
      // don't need to display
      setAck(true)
    }
  }, [notify])

  const handleGet = () => {
    setAck(!ack)
    notify.D1 = true
    localStorage.setItem('notify', JSON.stringify(notify))
  }
  const handleBlockClick = (id) => {
    navigate('/article/' + `${id}`)
  }

  const handleExit = async () => {
    await finishUser(user.pid)
  }

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

  return (
    <div>
      {tnum >= 3 ? (
        <>
          <Modal image={exit} handleClick={handleExit} />
        </>
      ) : (
        <></>
      )}
      {!ack ? (
        <>
          <Notice image={pn1} handleGet={handleGet} />
        </>
      ) : (
        <></>
      )}
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
