import React from 'react'
import styles from './index.module.css'

function Purchase({ image, confirm }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img src={image} className={styles.img} />
        <button className={styles.confirm} onClick={confirm}>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default Purchase
