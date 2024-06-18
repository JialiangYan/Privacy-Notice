import React, { memo } from 'react'
import { useState } from 'react'
import styles from './index.module.css'
import device from '../../../assets/store/device.png'
import review from '../../../assets/store/1_Reviews.png'
import info from '../../../assets/store/3_Information.png'
import privacy from '../../../assets/store/2_App Privacy.png'

function Downpart({ condition }) {
  const [more, openMore] = useState(false) // more description
  const description = more
    ? "QuickNews helps you discover balanced, unbiased stories -- for free. Connect with the world around you through editor curation and state-of-the-art algorithms. Whether it's politics, local coverage, sports, or entertainment, felling good about being informed has never been easier."
    : 'QuickNews helps you discover balanced, unbiased stories -- for free. Connect with the world around you through editor curation and state-of-the-art '

  return (
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
      {condition !== 2 && <img src={privacy} className={styles.img} alt="" />}
      <img src={info} className={styles.img} alt="" />
    </div>
  )
}

export default memo(Downpart)
