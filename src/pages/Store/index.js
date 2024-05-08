import { useEffect } from 'react'

import styles from './index.module.css'

import Slide from '../../components/Slide'

import up from '../../assets/up.png'

export default function Store() {
  return (
    <div className={styles.appContainer}>
      <img src={up} alt="" className={styles.up} />
      <Slide />
      <div className="store-header">Rating&Reviews</div>
      <span className="content"></span>
      <div className="store-header">App Privacy</div>
      <span className="content"></span>
      <div className="block1"></div>
      <div className="block2"></div>
      <div className="block3"></div>
      <div className="store-header">Information</div>
      <div className="information"></div>
    </div>
  )
}
