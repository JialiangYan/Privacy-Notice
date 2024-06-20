import React, { memo } from 'react'
import styles from './index.module.css'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'

function Slide() {
  const cld = new Cloudinary({ cloud: { cloudName: 'dfrapneyb' } })
  const s1 = cld.image('s1').format('auto').quality('10')
  const s2 = cld.image('s2').format('auto').quality('10')
  const s3 = cld.image('s3').format('auto').quality('10')

  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <div className={styles.row}>
          <div className={styles.imgContainer}>
            <AdvancedImage className={styles.img} cldImg={s2} />
          </div>
          <div className={styles.imgContainer}>
            <AdvancedImage className={styles.img} cldImg={s3} />
          </div>
          <div className={styles.imgContainer}>
            <AdvancedImage className={styles.img} cldImg={s1} loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Slide)
