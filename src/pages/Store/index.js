import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import styles from './index.module.css'

import Slide from '../../components/Slide'

import up from '../../assets/up.png'

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

  return (
    <div className={styles.main} ref={storeToapp}>
      <div className={`${styles.store} store`}>
        <img src={up} alt="" className={styles.up} />
        {/* <Slide />
        <div className="store-header">Rating&Reviews</div>
        <span className="content"></span>
        <div className="store-header">App Privacy</div>
        <span className="content"></span>
        <div className="block1"></div>
        <div className="block2"></div>
        <div className="block3"></div>
        <div className="store-header">Information</div>
        <div className="information"></div> */}
      </div>
      <div className={`${styles.app} app`}>
        <img src={up} alt="" className={styles.up} />
      </div>
    </div>
  )
}
