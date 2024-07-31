import transition from '../../animation/transition'
import { startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { track } from '../../utils/request'
import styles from './index.module.css'

import i2 from '../../assets/app/2.2.png'

function Intro2() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const condition = user.condition
  const displayNext3 = condition === 4 || condition === 6 || condition === 9

  // useEffect(() => {
  //   if (!localStorage.getItem('user')) {
  //     navigate('/error')
  //   }
  // }, [navigate])

  const handleNext2 = async () => {
    if (displayNext3) {
      startTransition(() => {
        navigate('/intro3')
      })
    } else {
      await track('Notice_C', { time: 0 }, user.pid)
      startTransition(() => {
        navigate('/home')
      })
    }
  }

  return (
    <div>
      <div className={`${styles.intro1} intro1`}>
        <img src={i2} alt="intro" className={`${styles.introImg}`} />
        <button className={styles.intro1Next} onClick={handleNext2}>
          Next
        </button>
      </div>
    </div>
  )
}

export default transition(Intro2)
