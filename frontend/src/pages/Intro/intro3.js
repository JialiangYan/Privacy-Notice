import transition from '../../animation/transition'
import { startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { track } from '../../utils/request'
import styles from './index.module.css'

import i3 from '../../assets/app/2.3.png'

function Intro3() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  // analytics
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpentOnPage((prevTime) => prevTime + 1000)
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const handleNext3 = async () => {
    await track('Notice_C', { time: timeSpentOnPage }, user.pid)
    startTransition(() => {
      navigate('/home')
    })
  }

  return (
    <div>
      <div className={`${styles.intro1} intro1`}>
        <img src={i3} alt="intro" className={`${styles.introImg}`} />
        <button className={styles.intro1Next} onClick={handleNext3}>
          Next
        </button>
      </div>
    </div>
  )
}

export default transition(Intro3)
