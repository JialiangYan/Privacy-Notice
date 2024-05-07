import { useEffect } from 'react'

import styles from './index.module.css'

import Slide from '../../components/Slide'

import icon from '../../assets/icon.png'

export default function Store() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.header}>
        <img src={icon} alt="App Icon" className={styles.appIcon} />
        <div className={styles.appInfo}>
          <h1 className={styles.appTitle}>Quick News</h1>
          <p className={styles.appCategory}>Breaking, Local & World News</p>
        </div>
      </div>
      {/* banner */}
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
