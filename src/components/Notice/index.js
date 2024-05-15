import React from 'react'
import styles from './index.module.css'
import { motion } from 'framer-motion'

export default function Notice({ image, handleGet }) {
  return (
    <>
      <div className={styles.overlay}>
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className={styles.modal}
        >
          <img className={styles.img} src={image} alt="" />
          <button onClick={handleGet} className={styles.btn}></button>
        </motion.div>
      </div>
    </>
  )
}
