import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './index.module.css'

export default function DownloadAni() {
  const tl = gsap.timeline()
  const progressRef = useRef(null)

  useEffect(() => {
    tl.to(progressRef.current, {
      rotation: 360,
      transformOrigin: 'center',
      repeat: -1,
      duration: 1.3,
      ease: 'linear',
    })
      .to(progressRef.current, {
        duration: 0.3,
        borderRightColor: '#007bff',
      })
      .to(progressRef.current, {
        duration: 0.1,
        borderColor: '#007bff',
      })
  }, [tl])

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.square}></div>
        <div className={styles.circle} ref={progressRef}></div>
      </div>
    </div>
  )
}
