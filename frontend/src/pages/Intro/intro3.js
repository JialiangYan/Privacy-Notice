import transition from '../../animation/transition'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './index.module.css'

import i3 from '../../assets/app/2.3.png'

function Intro3() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/error')
    }
  }, [navigate])

  const handleNext3 = () => {
    navigate('/home')
  }

  const handleBack3 = () => {
    navigate('/intro2')
  }

  return (
    <>
      <div className={`${styles.intro1} intro1`}>
        <img src={i3} alt="intro" className={`${styles.introImg}`} />
        <button className={styles.intro1Next} onClick={handleNext3}></button>
        <button className={styles.intro3Back} onClick={handleBack3}></button>
      </div>
    </>
  )
}

export default transition(Intro3)
