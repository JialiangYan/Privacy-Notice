import React from 'react'
import styles from './index.module.css'

function Slide({ images }) {
  return (
    <div class={styles.container}>
      <div class={styles.scroll}>
        <div class={styles.row}>
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
