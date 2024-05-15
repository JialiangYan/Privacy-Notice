import { useEffect, useState } from 'react'
import transition from '../../animation/transition'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'

import i1 from '../../assets/app/2.1.png'

function Intro1() {
  const navigate = useNavigate()
  const handleNext1 = () => {
    navigate('/intro2')
  }

  return (
    <>
      <div className={`${styles.intro1} intro1`}>
        <img src={i1} alt="" className={`${styles.introImg}`} />
        <button className={styles.intro1Next} onClick={handleNext1}></button>
      </div>
    </>
  )
}

export default transition(Intro1)
