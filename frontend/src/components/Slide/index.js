import React, { memo } from 'react'
import styles from './index.module.css'

import s1 from '../../assets/store/ss1.webp'
import s2 from '../../assets/store/ss2.webp'
import s3 from '../../assets/store/ss3.webp'

function Slide() {
  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <div className={styles.row}>
          <img className={styles.img} src={s1} alt="" />
          <img className={styles.img} src={s2} alt="" />
          <img className={styles.img} src={s3} alt="" />
        </div>
      </div>
    </div>
  )
}

export default memo(Slide)
