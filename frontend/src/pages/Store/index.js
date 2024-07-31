import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import transition from '../../animation/transition'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import styles from './index.module.css'

import useOnScreen from '../../utils/useOnScreen'
import { track } from '../../utils/request'
import Slide from '../../components/Slide'
import Purchase from '../../components/Purchase'
import DownloadAni from '../../components/DownloadAni'
import LoadingAni from '../../components/LoadingAni'

import up from '../../assets/store/up.png'
import device from '../../assets/store/device.png'
import review from '../../assets/store/1_Reviews.png'
import info from '../../assets/store/3_Information.png'
import privacy from '../../assets/store/2_App Privacy.png'

function Store() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const condition = user.condition // timing condition
  const [get, setGet] = useState(false) // the content of button
  const [open, setOpen] = useState(false) // open the purchase

  const [more, openMore] = useState(false) // more description
  const description = more
    ? "QuickNews helps you discover balanced, unbiased stories -- for free. Connect with the world around you through editor curation and state-of-the-art algorithms. Whether it's politics, local coverage, sports, or entertainment, felling good about being informed has never been easier."
    : 'QuickNews helps you discover balanced, unbiased stories -- for free. Connect with the world around you through editor curation and state-of-the-art '
  const storeToapp = useRef()
  const tlBtn = gsap.timeline()
  const tlPage = gsap.timeline()
  const { contextSafe } = useGSAP({ scope: storeToapp })

  const btn = get ? 'Open' : 'Get'

  // loading
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  // track timeA
  const refp1 = useRef(null)
  const refp2 = useRef(null)
  const naturalSetting = condition != 2
  const isVisible = useOnScreen(naturalSetting ? refp1 : refp2)
  const [timeA, setTimeA] = useState(0)
  const startTimeA = useRef(null)
  const startTimeB = useRef(null)

  useEffect(() => {
    if (isVisible) {
      startTimeA.current = Date.now()
    } else {
      if (startTimeA.current !== null) {
        const endTime = Date.now()
        const duration = endTime - startTimeA.current
        setTimeA(timeA + duration)
        startTimeA.current = null
      }
    }
    return () => {
      if (isVisible && startTimeA.current !== null) {
        const endTime = Date.now()
        const duration = endTime - startTimeA.current
        setTimeA(timeA + duration)
      }
    }
  }, [isVisible])

  // Test timeA
  // useEffect(() => {
  //   // Define a function to log the value of timeA
  //   const logTimeA = () => {
  //     console.log(`Current value of timeA: ${timeA}`)
  //   }

  //   // Set an interval to call logTimeA every 1000 milliseconds (1 second)
  //   const intervalId = setInterval(logTimeA, 1000)

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId)
  //   }
  // }, [timeA])

  // animation for loading btn
  const getApp = contextSafe(() => {
    tlBtn
      .to('.btn', {
        width: '29px',
        borderRadius: '12px',
        duration: 0.5,
        backgroundColor: 'rgba(0, 122, 255, 0.7',
        opacity: 0,
      })
      .to(
        '.loading',
        {
          duration: 1,
          opacity: 1,
          onComplete: () => {
            setOpen(!open)
          },
        },
        '+=0'
      )
    startTimeB.current = Date.now()
  })

  const close = () => {
    setOpen(!open)
    tlBtn
      .set('.loading', {
        opacity: 0,
      })
      .to('.btn', {
        width: '71px',
        borderRadius: '100px',
        duration: 0.5,
        backgroundColor: '#007aff',
        opacity: 1,
      })
  }

  const confirm = async () => {
    setOpen(!open)

    if (condition == 3 || condition == 6 || condition == 8 || condition == 9) {
      await track(
        'Notice_B',
        { time: Date.now() - startTimeB.current },
        user.pid
      )
    } else {
      await track('Notice_B', { time: 0 }, user.pid)
    }

    tlBtn
      .to(
        '.loading',
        {
          duration: 3,
          opacity: 0,
          onComplete: () => {
            setOpen(!open)
          },
        },
        '+=0'
      )
      .to(
        '.downloading',
        {
          duration: 0.3,
          opacity: 1,
        },
        '+=0'
      )
      .to(
        '.downloading',
        {
          duration: 0.5,
          opacity: 0,
          onComplete: () => {
            setGet(!get)
          },
        },
        '+=0'
      )
      .to('.btn', {
        duration: 0.5,
        opacity: 1,
        width: '71px',
        borderRadius: '100px',
        backgroundColor: '#007aff',
      })
  }

  // animation for page transition
  const openApp = contextSafe(async () => {
    tlPage
      .to(['.store', '.app'], {
        borderRadius: '4rem',
        height: '100vh',
        duration: 0.1,
        border: '2px solid gainsboro',
      })
      .to(
        '.app',
        {
          x: '-50vw',
          y: '0vh',
          scale: 0.9,
          duration: 0.3,
        },
        0
      )
      .to(
        '.store',
        {
          x: '-45vw',
          scale: 0.9,
          y: '0vh',
          duration: 0.3,
        },
        0
      )
      .to(
        ['.store', '.app'],
        {
          x: '-100vw',
          scale: 1.01,
          borderRadius: '0',
          duration: 0.3,
        },
        '+=0.3'
      )

    if (naturalSetting) {
      await track('Notice_A1', { time: timeA }, user.pid)
    } else {
      await track('Notice_A2', { time: timeA }, user.pid)
    }

    setTimeout(() => {
      navigate('/intro1')
    }, 3000)
  })

  return (
    <div className={styles.main} ref={storeToapp}>
      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          {/* Purchase Model */}
          {open && (
            <Purchase confirm={confirm} close={close} condition={condition} />
          )}
          {/* Store Page */}
          <div
            className={`${styles.store} store ${open ? styles.fullStore : ''}`}
          >
            {/* Upper part */}
            <div className={styles.up}>
              <img
                className={styles.img}
                src={up}
                style={{ marginTop: '5px' }}
              />

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
            {!naturalSetting && (
              <img
                src={privacy}
                ref={refPrivacy1}
                className={styles.img}
                alt=""
              />
            )}
            <Slide className={styles.slide} />
            <div>
              <div className={styles.down}>
                <img src={device} className={styles.img} alt="" />
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
              <img src={review} className={styles.img} alt="" />
              {naturalSetting && (
                <img ref={refp1} src={privacy} className={styles.img} alt="" />
              )}
              <img src={info} className={styles.img} alt="" />
            </div>
          </div>
          {/* App Intro Page */}
          <div className={`${styles.app} app`}>
            <div className={styles.name}>QuickNews</div>
          </div>
        </>
      )}
    </div>
  )
}

export default transition(Store)
