import React, { useEffect } from 'react'
import styles from './index.module.css'

function Slide({ images }) {
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image()
      img.src = image
    })
  }, [])

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
