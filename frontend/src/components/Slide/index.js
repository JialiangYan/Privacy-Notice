import React, { memo } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'

import styles from './index.module.css'

// import s1 from '../../assets/store/ss1.webp'
// import s2 from '../../assets/store/ss2.webp'
// import s3 from '../../assets/store/ss3.webp'

function Slide() {
  const cld = new Cloudinary({ cloud: { cloudName: 'dfrapneyb' } })
  const ss1 = cld.image('ss1').format('auto').quality('auto')
  const ss2 = cld.image('ss2').format('auto').quality('auto')
  const ss3 = cld.image('ss3').format('auto').quality('auto')

  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <div className={styles.row}>
          <div className={styles.imgContainer}>
            {/* <img className={styles.img} src={s1} alt="" /> */}
            <AdvancedImage className={styles.img} cldImg={ss1} />
          </div>
          <div className={styles.imgContainer}>
            {/* <img className={styles.img} src={s2} alt="" /> */}
            <AdvancedImage className={styles.img} cldImg={ss2} />
          </div>
          <div className={styles.imgContainer}>
            {/* <img className={styles.img} src={s3} alt="" loading="lazy" /> */}
            <AdvancedImage className={styles.img} cldImg={ss3} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Slide)
