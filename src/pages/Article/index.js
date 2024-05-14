import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'

import data from '../../assets/app/data.json'
import img1 from '../../assets/app/news1.png'
import img2 from '../../assets/app/news1.png'
import img3 from '../../assets/app/news1.png'
import back from '../../assets/app/backBtn.png'

export default function Article() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { title, image, source, date, text } = data[id]
  const imgs = [img1, img2, img3]
  const handleBack = () => {
    navigate('/home')
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        <div>{date}</div>
        <div>{source}</div>
      </div>
      <img className={styles.img} src={imgs[image]} alt="" />
      <div className={styles.text}>{}</div>
      <div className={styles.backBtn} onClick={handleBack}>
        <img className={styles.img} src={back} alt="" />
      </div>
    </div>
  )
}
