import { useEffect, useState } from 'react'
import transition from '../../animation/transition'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'

import i2 from '../../assets/app/2.2.png'

function Intro2() {
  const navigate = useNavigate()
  const handleNext2 = () => {
    navigate('/intro3')
  }
  const handleBack2 = () => {
    navigate('/intro1')
  }

  return (
    <>
      <div className={`${styles.intro1} intro1`}>
        <img src={i2} alt="" className={`${styles.introImg}`} />
        <button className={styles.intro1Next} onClick={handleNext2}></button>
        <button className={styles.intro2Back} onClick={handleBack2}></button>
      </div>
    </>
  )
}

export default transition(Intro2)
