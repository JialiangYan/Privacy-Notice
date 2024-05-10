import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import styles from './index.module.css'

import Slide from '../../components/Slide'
import Purchase from '../../components/Purchase'

import up from '../../assets/store/up.png'
import s1 from '../../assets/store/ss1.png'
import s2 from '../../assets/store/ss2.png'
import s3 from '../../assets/store/ss3.png'
import device from '../../assets/store/device.png'
import bottom from '../../assets/store/bottom.png'
import buyp from '../../assets/store/buy-p.png'

export default function Store() {
  const tl = gsap.timeline()
  const storeToapp = useRef()

  useGSAP(
    () => {
      gsap.to('.store', { x: -160, scale: 0.5, duration: 3 })

      gsap.to('.app', {
        x: -300,
        scale: 0.5,
        duration: 3,
        onUpdate: function () {
          gsap.set('.app', { flex: '0 0 100%' })
        },
      })
    },
    { scope: storeToapp }
  )

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
  const confirm = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.main} ref={storeToapp}>
      {/* Store Page */}
      <div className={`${styles.store} store ${open ? styles.fullStore : ''}`}>
        {open ? <Purchase image={buyp} confirm={confirm} /> : <div></div>}
        <div className={styles.up}>
          <img src={up} className={styles.img} />
          <button className={styles.btn} onClick={getApp}>
            {btn}
          </button>
        </div>

        <Slide images={images} />
        <div className={styles.down}>
          <img src={device} style={{ width: '100%' }} />
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
      {/* App Page */}
      <div className={`${styles.app} app`}>
        <img src={up} alt="" className={styles.up} />
      </div>
    </div>
  )
}
