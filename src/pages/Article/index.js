import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal'
import styles from './index.module.css'
import A1 from './A1'
import A2 from './A2'
import A3 from './A3'

import data from '../../assets/app/data.json'
import img1 from '../../assets/app/news1.png'
import img2 from '../../assets/app/news1.png'
import img3 from '../../assets/app/news1.png'
import back from '../../assets/app/backBtn.png'
import pn2 from '../../assets/notice/pn2.png'

export default function Article() {
  const navigate = useNavigate()
  const [ack, setAck] = useState(false)

  useEffect(() => {
    const hasAck = localStorage.getItem('hasAck2')
    if (hasAck) {
      setAck(true)
    }
  }, [])

  const handleGet = () => {
    localStorage.setItem('hasAck2', 'true')
    setAck(!ack)
  }

  const { id } = useParams()
  const { title, image, source, date } = data[id]
  const imgs = [img1, img2, img3]
  const articles = [A1, A2, A3]
  const handleBack = () => {
    navigate('/home')
  }

  return (
    <>
      {!ack ? (
        <>
          <Modal image={pn2} handleGet={handleGet} />
        </>
      ) : (
        <></>
      )}
      <div className={styles.main}>
        <div className={styles.topBar}>
          <img className={styles.bimg} src={back} alt="" onClick={handleBack} />
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
