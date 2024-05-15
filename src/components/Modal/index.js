import React from 'react'
import styles from './index.module.css'

export default function Modal({ content, handleClick }) {
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <div className={styles.content}>{content}</div>
        {handleClick == null ? (
          <></>
        ) : (
          <button onClick={handleClick} className={styles.btn}>
            Exit
          </button>
        )}
      </div>
    </>
  )
}
