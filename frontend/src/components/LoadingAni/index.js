import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './index.module.css'

export default function DownloadAni() {
  const progressRef = useRef(null)

  useEffect(() => {
    gsap.to(progressRef.current, {
      rotation: 360,
      transformOrigin: 'center',
      repeat: -1,
      duration: 1.3,
      ease: 'linear',
    })
  }, [])

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.circle} ref={progressRef}></div>
      </div>
    </div>
  )
}
