import React from 'react'
import styles from './index.module.css'

function Purchase({ image, confirm, close }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img src={image} className={styles.img} />
        <button className={styles.confirm} onClick={confirm}></button>
        <button className={styles.close} onClick={close}></button>
      </div>
    </div>
  )
}

export default Purchase
