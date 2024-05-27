import React from 'react'
import styles from './index.module.css'
import { motion } from 'framer-motion'
import ybuy from '../../assets/store/buy-p.png'
import nbuy from '../../assets/store/buy-np.png'

function Purchase({ confirm, close, condition }) {
  const buy =
    condition === 4 || condition === 7 || condition === 9 || condition === 10

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={styles.overlay}
    >
      {buy ? (
        <div className={styles.modal}>
          <img src={ybuy} className={styles.bimg} alt="" />
          <button
            className={`${styles.bconfirm} ${styles.btn}`}
            onClick={confirm}
          >
            {'Confirm'}
          </button>
          <button className={styles.close} onClick={close}></button>
        </div>
      ) : (
        <div className={styles.modal}>
          <img src={nbuy} className={styles.nimg} alt="" />
          <button
            className={`${styles.nconfirm} ${styles.btn}`}
            onClick={confirm}
          >
            {'Confirm'}
          </button>
          <button className={styles.close} onClick={close}></button>
        </div>
      )}
    </motion.div>
  )
}

export default Purchase
