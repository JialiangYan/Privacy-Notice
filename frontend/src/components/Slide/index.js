import React from 'react'
import styles from './index.module.css'

import s1 from '../../assets/store/ss1.webp'
import s2 from '../../assets/store/ss2.webp'
import s3 from '../../assets/store/ss3.webp'

function Slide() {
  const images = [s1, s2, s3]
  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <div className={styles.row}>
          {images.map((image, index) => (
            <img
              key={index}
              className={styles.img}
              src={image}
              alt={`Screenshot ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slide
