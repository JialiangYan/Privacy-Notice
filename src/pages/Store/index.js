import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import styles from './index.module.css'

import Slide from '../../components/Slide'
import Purchase from '../../components/Purchase'
import DownloadAni from '../../components/DownloadAni'
import LoadingAni from '../../components/LoadingAni'

import loading from '../../assets/store/loading.svg'
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

  const storeToapp = useRef()
  const tlBtn = gsap.timeline()
  const tlPage = gsap.timeline()
  const { contextSafe } = useGSAP({ scope: storeToapp })

  const description = more
    ? "QuickNews helps you discover balanced, unbiased stories -- for free. Connect with the world around you through editor curation and state-of-the-art algorithms. Whether it's politics, local coverage, sports, or entertainment, felling good about being informed has never been easier."
    : 'QuickNews helps you discover balanced, unbiased stories -- for free. Connect with the world around you through editor curation and state-of-the-art '
  const btn = get ? 'Open' : 'Get'

  // animation for loading btn
  const getApp = contextSafe(() => {
    tlBtn
      .to('.btn', {
        width: '29px',
        borderRadius: '12px',
        duration: 1,
        backgroundColor: 'rgba(0, 122, 255, 0.7',
        opacity: 0,
      })
      .to(
        '.loading',
        {
          duration: 3,
          opacity: 1,
          onComplete: () => {
            setOpen(!open)
          },
        },
        '+=0'
      )
  })
  const confirm = () => {
    setOpen(!open)
    tlBtn
      .to('.loading', {
        duration: 3,
        opacity: 0,
        onComplete: () => {
          setOpen(!open)
        },
      })
      .to('.downloading', {
        duration: 3,
        opacity: 1,
        onComplete: () => {
          setGet(!get)
        },
      })
    // .to('.btn', {
    //   duration: 0.1,
    //   opacity: 1,
    // })
  }

  // animation for page transition
  const openApp = contextSafe(() => {
    tlPage
      .to(['.store', '.app'], {
        borderRadius: '4rem',
        duration: 0.1,
      })
      .to(['.store', '.app'], {
        x: '-46vw',
        scale: 0.95,
        duration: 1,
      })
    // .to(['.store', '.app'], {
    //   x: '-100vw',
    //   scale: 1.01,
    //   duration: 1,
    // })

    // gsap.to('.app', {
    //   x: '-50vw',
    //   scale: 0.9,
    //   duration: 3,
    // })
  })

  // animation for sliding intro
  const app = useRef()

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
        {open ? (
          <Purchase
            image={buyp}
            confirm={confirm}
            close={() => {
              setOpen(!open)
            }}
          />
        ) : (
          <div></div>
        )}
        {/* Upper part */}
        <div className={styles.up}>
          <img src={up} className={styles.img} style={{ marginTop: '5px' }} />
          <button
            className={`${styles.btn} btn`}
            onClick={get ? openApp : getApp}
          >
            {btn}
          </button>
          <div className={`${styles.downloading} downloading`}>
            <DownloadAni />
          </div>
          <div className={`${styles.loading} loading`}>
            <LoadingAni />
          </div>
        </div>
        <Slide images={images} />
        {/* Lower part */}
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
