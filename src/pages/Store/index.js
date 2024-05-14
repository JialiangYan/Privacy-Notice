import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import styles from './index.module.css'

import Slide from '../../components/Slide'
import Purchase from '../../components/Purchase'

import up from '../../assets/store/up.png'
import s1 from '../../assets/store/ss1.png'
import s2 from '../../assets/store/ss2.png'
import s3 from '../../assets/store/ss3.png'
import i1 from '../../assets/app/2.1.png'
import i2 from '../../assets/app/2.2.png'
import i3 from '../../assets/app/2.3.png'
import device from '../../assets/store/device.png'
import bottom from '../../assets/store/bottom.png'
import buyp from '../../assets/store/buy-p.png'

export default function Store() {
  const navigate = useNavigate()
  const images = [s1, s2, s3]
  const [more, openMore] = useState(false) // more description
  const [get, setGet] = useState(false) // the content of button
  const [open, setOpen] = useState(false) // open the purchase

  const description = more
    ? "QuickNews helps you discover balanced, unbiased stories -- for free. Connect with the world around you through editor curation and state-of-the-art algorithms. Whether it's politics, local coverage, sports, or entertainment, felling good about being informed has never been easier."
    : 'QuickNews helps you discover balanced, unbiased stories -- for free. Connect with the world around you through editor curation and state-of-the-art '
  const btn = get ? 'Open' : 'Get'
  const getApp = () => {
    setGet(!get)
    setOpen(!open)
  }
  const openApp = () => {
    console.log('Animation!')
  }
  const confirm = () => {
    setOpen(!open)
  }

  // animation for page transition
  const tl = gsap.timeline()
  const storeToapp = useRef()

  // useGSAP(
  //   () => {
  //     gsap.to('.store', { x: -160, scale: 0.5, duration: 3 })

  //     gsap.to('.app', {
  //       x: -300,
  //       scale: 0.5,
  //       duration: 3,
  //       onUpdate: function () {
  //         gsap.set('.app', { flex: '0 0 100%' })
  //       },
  //     })
  //   },
  //   { scope: storeToapp }
  // )

  // animation for sliding intro
  const app = useRef()
  const { contextSafe } = useGSAP({ scope: app })
  // useGSAP(
  //   () => {
  //     gsap.to('.store', { x: -160, scale: 0.5, duration: 3 })

  //     gsap.to('.app', {
  //       x: -300,
  //       scale: 0.5,
  //       duration: 3,
  //       onUpdate: function () {
  //         gsap.set('.app', { flex: '0 0 100%' })
  //       },
  //     })
  //   },
  //   { scope: storeToapp }
  // )

  const handleNext1 = contextSafe(() => {
    gsap.to('.intro1', { display: 'none' })
    gsap.to('.intro2', { display: 'block' })
  })

  const handleBack2 = contextSafe(() => {
    gsap.to('.intro2', { display: 'none' })
    gsap.to('.intro1', { display: 'block' })
  })

  const handleNext2 = contextSafe(() => {
    gsap.to('.intro2', { display: 'none' })
    gsap.to('.intro3', { display: 'block' })
  })

  const handleBack3 = contextSafe(() => {
    gsap.to('.intro3', { display: 'none' })
    gsap.to('.intro2', { display: 'block' })
  })

  const handleNext3 = contextSafe(() => {
    navigate('/home')
  })

  return (
    <div className={styles.main} ref={storeToapp}>
      {/* Store Page */}
      <div className={`${styles.store} store ${open ? styles.fullStore : ''}`}>
        {/* Purchase modal */}
        {open ? <Purchase image={buyp} confirm={confirm} /> : <div></div>}
        {/* Upper part */}
        <div className={styles.up}>
          <img src={up} className={styles.img} />
          <button className={styles.btn} onClick={get ? openApp : getApp}>
            {btn}
          </button>
        </div>
        {/* Slides */}
        <Slide images={images} />
        <div className={styles.down}>
          <img src={device} className={styles.img} />
          <div className={styles.description}>
            {description}
            <span
              className={more ? styles.nomore : styles.more}
              onClick={() => openMore(!more)}
            >
              more
            </span>
          </div>
        </div>
        <img src={bottom} className={styles.img} />
      </div>
      {/* App Intro Page */}
      <div className={`${styles.app} app`} ref={app}>
        <div className={`${styles.intro1} intro1`}>
          <img src={i1} alt="" className={`${styles.introImg}`} />
          <button className={styles.intro1Next} onClick={handleNext1}></button>
        </div>
        <div className={`${styles.intro2} intro2`}>
          <img src={i2} alt="" className={`${styles.introImg}`} />
          <button className={styles.intro2Next} onClick={handleNext2}></button>
          <button className={styles.intro2Back} onClick={handleBack2}></button>
        </div>
        <div className={`${styles.intro3} intro3`}>
          <img src={i3} alt="" className={`${styles.introImg}`} />
          <button className={styles.intro3Next} onClick={handleNext3}></button>
          <button className={styles.intro3Back} onClick={handleBack3}></button>
        </div>
      </div>
    </div>
  )
}
