import transition from '../../animation/transition'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'

import i2 from '../../assets/app/2.2.png'

function Intro2() {
  const navigate = useNavigate()
  const condition = JSON.parse(localStorage.getItem('user')).condition
  const displayNext3 = condition === 5 || condition === 7 || condition === 10

  // useEffect(() => {
  //   if (!localStorage.getItem('user')) {
  //     navigate('/error')
  //   }
  // }, [navigate])

  const handleNext2 = () => {
    if (displayNext3) {
      navigate('/intro3')
    } else {
      navigate('/home')
    }
  }
  const handleBack2 = () => {
    navigate('/intro1')
  }

  return (
    <>
      <div className={`${styles.intro1} intro1`}>
        <img src={i2} alt="intro" className={`${styles.introImg}`} />
        <button className={styles.intro1Next} onClick={handleNext2}>
          Next
        </button>
        <button className={styles.intro2Back} onClick={handleBack2}>
          Back
        </button>
      </div>
    </>
  )
}

export default transition(Intro2)
