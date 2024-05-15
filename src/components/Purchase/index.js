import React from 'react'
import styles from './index.module.css'
import { motion } from 'framer-motion'

function Purchase({ image, confirm, close }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={styles.overlay}
    >
      <div className={styles.modal}>
        <img src={image} className={styles.img} />
        <button className={styles.confirm} onClick={confirm}></button>
        <button className={styles.close} onClick={close}></button>
      </div>
    </motion.div>
  )
}

export default Purchase
