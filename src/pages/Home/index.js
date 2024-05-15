import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../GlobalState'
import transition from '../../animation/transition'
import Modal from '../../components/Modal'
import Notice from '../../components/Notice'
import NewsBlock from '../../components/NewsBlock'
import Tracker from '../../components/Tracker'

import data from '../../assets/app/data.json'
import pn1 from '../../assets/notice/pn1.png'

import styles from './index.module.css'

function Home() {
  const { tasknum, notice, updateNotice } = useContext(GlobalContext)

  const navigate = useNavigate()
  const [ack, setAck] = useState(false)

  useEffect(() => {
    const hasAck = !notice.firstuse
    if (hasAck) {
      setAck(true)
    }
  }, [])

  const handleGet = () => {
    updateNotice({ intro: !notice.intro })
    localStorage.setItem('hasAck1', 'true')
    setAck(!ack)
  }
  const handleBlockClick = (id) => {
    navigate('/article/' + `${id}`)
  }

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
      {tasknum == 3 ? (
        <>
          <Modal
            content={'You have sccusssfully finished this study'}
            handleClick={() => {
              window.location.href = 'https://www.google.ca/'
            }}
          />
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
          <Tracker num={tasknum} />
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
