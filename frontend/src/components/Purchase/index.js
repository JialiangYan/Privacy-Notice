import React from 'react'
import styles from './index.module.css'
import { motion } from 'framer-motion'
import ybuy from '../../assets/store/buy-p.png'
import nbuy from '../../assets/store/buy-np.png'

export function Purchase({ confirm, close }) {
  return (
    <div className={styles.bmodal}>
      <img src={ybuy} className={styles.bimg} alt="" />
      <button className={`${styles.bconfirm} ${styles.btn}`} onClick={confirm}>
        {'Confirm'}
      </button>
      <button className={styles.close} onClick={close}></button>
    </div>
  )
}

export function NPurchase({ confirm, close }) {
  return (
    <div className={styles.nmodal}>
      <img src={nbuy} className={styles.nimg} alt="" />
      <button className={`${styles.nconfirm} ${styles.btn}`} onClick={confirm}>
        {'Confirm'}
      </button>
      <button className={styles.close} onClick={close}></button>
    </div>
  )
}
