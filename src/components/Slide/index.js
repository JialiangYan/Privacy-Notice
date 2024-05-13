import React from 'react'
import styles from './index.module.css'

function Slide({ images }) {
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
