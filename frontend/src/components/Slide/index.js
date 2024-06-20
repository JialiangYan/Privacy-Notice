import React, { memo } from 'react'
import styles from './index.module.css'

function Slide() {
  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <div className={styles.row}>
          <img
            className={styles.img}
            src={
              'https://res.cloudinary.com/dfrapneyb/image/upload/v1718898988/s1.webp'
            }
            alt=""
          />
          <img
            className={styles.img}
            src={
              'https://res.cloudinary.com/dfrapneyb/image/upload/v1718898989/s2.webp'
            }
            alt=""
          />
          <img
            className={styles.img}
            src={
              'https://res.cloudinary.com/dfrapneyb/image/upload/v1718898988/s3.webp'
            }
            alt=""
            priority="low"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default memo(Slide)
