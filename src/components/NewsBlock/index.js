import React from 'react'
import styles from './index.module.css'

import img1 from '../../assets/app/news1.png'
import img2 from '../../assets/app/news1.png'
import img3 from '../../assets/app/news1.png'

export default function NewsBlock({ article, handleBlockClick }) {
  const { title, image, source, time } = article
  const imgs = [img1, img2, img3]

  return (
    <div className={styles.block} onClick={handleBlockClick}>
      <img className={styles.img} src={imgs[image]} alt="" />
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        <div>{time}</div>
        <div>{source}</div>
      </div>
    </div>
  )
}
