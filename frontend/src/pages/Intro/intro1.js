import transition from '../../animation/transition'
import { startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'

import i1 from '../../assets/app/2.1.png'

function Intro1() {
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!localStorage.getItem('user')) {
  //     navigate('/error')
  //   }
  // }, [navigate])

  const handleNext1 = () => {
    startTransition(() => {
      navigate('/intro2')
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

export default transition(Intro1)
