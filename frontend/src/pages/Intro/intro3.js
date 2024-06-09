import transition from '../../animation/transition'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { track } from '../../utils/request'
import styles from './index.module.css'

import i3 from '../../assets/app/2.3.png'

function Intro3() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  // useEffect(() => {
  //   if (!localStorage.getItem('user')) {
  //     navigate('/error')
  //   }
  // }, [navigate])

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
    console.log('Time spent on page:', timeSpentOnPage)
    await track('Intro3_Time', { time: timeSpentOnPage }, user.pid)
    navigate('/home')
  }

  const handleBack3 = () => {
    navigate('/intro2')
  }

  return (
    <>
      <div className={`${styles.intro1} intro1`}>
        <img src={i3} alt="intro" className={`${styles.introImg}`} />
        <button className={styles.intro1Next} onClick={handleNext3}>
          Agree
        </button>
        <button className={styles.intro3Back} onClick={handleBack3}>
          Disagree
        </button>
      </div>
    </>
  )
}

export default transition(Intro3)
