import React from 'react'
import styles from './index.module.css'
import { motion } from 'framer-motion'

export default function Notice({ image, handleClick }) {
  return (
    <>
      <div className={styles.overlay}>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className={styles.modal}
        >
          <img loading="lazy" className={styles.img} src={image} alt="Notice" />
          <button onClick={handleClick} className={styles.btn}></button>
        </motion.div>
      </div>
    </>
  )
}
