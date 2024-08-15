import transition from '../../animation/transition'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import withAuthorization from '../../utils/withAuthorization'
import styles from './index.module.css'

import i2 from '../../assets/app/2.2.png'

function Intro2() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const condition = user.condition
  const displayNext3 =
    condition == 4 || condition == 6 || condition == 7 || condition == 9

  useEffect(() => {
    localStorage.setItem('prestate', '/quicknews/intro2')
  }, [])

  const handleNext2 = async () => {
    if (displayNext3) {
      navigate('/quicknews/intro3', { state: { valid: true } })
    } else {
      navigate('/quicknews/home', { state: { valid: true } })
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

export default withAuthorization(transition(Intro2))
