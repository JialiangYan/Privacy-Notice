import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal'
import NewsBlock from '../../components/NewsBlock'

import data from '../../assets/app/data.json'
import pn1 from '../../assets/notice/pn1.png'

import styles from './index.module.css'

export default function Home() {
  const navigate = useNavigate()
  const [ack, setAck] = useState(false)

  useEffect(() => {
    const hasAck = localStorage.getItem('hasAck1')
    if (hasAck) {
      setAck(true)
    }
  }, [])

  const handleGet = () => {
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
      {!ack ? (
        <>
          <Modal image={pn1} handleGet={handleGet} />
        </>
      ) : (
        <></>
      )}
      <div className={styles.main}>
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
