import React from 'react'
import styles from './index.module.css'

export default function Tracker({ num }) {
  return (
    <div className={styles.circle}>
      <div className={styles.content}>{num}/3</div>
    </div>
  )
}
