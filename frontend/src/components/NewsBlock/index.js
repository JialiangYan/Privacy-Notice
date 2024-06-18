import React from 'react'
import styles from './index.module.css'

export default function NewsBlock({ article, handleBlockClick }) {
  const { title, image, source } = article

  return (
    <div className={styles.block} onClick={handleBlockClick}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={image} alt="" />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        <div>{source}</div>
      </div>
    </div>
  )
}
