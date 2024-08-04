import transition from '../../animation/transition'
import { startTransition, useEffect } from 'react'
import withAuthorization from '../../utils/withAuthorization'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'

import i1 from '../../assets/app/2.1.png'

function Intro1() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('prestate', '/quicknews/intro1')
  }, [])

  const handleNext1 = () => {
    startTransition(() => {
      navigate('/quicknews/intro2', { state: { valid: true } })
    })
  }

  return (
    <div>
      <div className={`${styles.intro1} intro1`}>
        <img src={i1} alt="intro" className={`${styles.introImg}`} />
        <button className={styles.intro1Next} onClick={handleNext1}>
          Next
        </button>
      </div>
    </div>
  )
}

export default withAuthorization(transition(Intro1))
