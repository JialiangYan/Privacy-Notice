import React from 'react'
import styles from './index.module.css'

export default function Modal({ image, handleGet }) {
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <img className={styles.img} src={image} alt="" />
      </div>
      <button onClick={handleGet} className={styles.btn}></button>
    </>
  )
}
