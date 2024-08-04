import { useEffect, useState, startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { track } from '../../utils/request'
import transition from '../../animation/transition'
import CustomToast from '../../components/CustomToast'
import Notice from '../../components/Notice'
import NewsBlock from '../../components/NewsBlock'
import news from '../../components/NewsContent/News'
import withAuthorization from '../../utils/withAuthorization'
import pn1 from '../../assets/notice/pn1.png'
import styles from './index.module.css'

function Home() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const notify = JSON.parse(localStorage.getItem('notify'))
  const orderNews = user.newsOrder.map((id) =>
    news.find((item) => item.id === id)
  )
  const [ack, setAck] = useState(false)
  const [formattedDate, setFormattedDate] = useState('') // date
  const [endTime, setEndTime] = useState(
    localStorage.getItem('time') ? new Date(localStorage.getItem('time')) : null
  )
  const startTimeD1 = Date.now()

  // functions
  const handleGet = () => {
    setAck(!ack)
    notify.D1 = true
    localStorage.setItem('notify', JSON.stringify(notify))
  }
  const handleBlockClick = (id) => {
    startTransition(async () => {
      await track('Notice_D1', { time: Date.now() - startTimeD1 }, user.pid)
    })
    navigate(`/quicknews/article/${id}`, { state: { valid: true } })
  }

  useEffect(() => {
    async function report() {
      let condition = user.condition
      if (
        condition != 5 &&
        condition != 7 &&
        condition != 8 &&
        condition != 9
      ) {
        await track('Notice_D1', { time: 0 }, user.pid)
        await track('Notice_D2', { time: 0 }, user.pid)
      }
    }
    report()
  }, [])

  useEffect(() => {
    if (!endTime) {
      const startTime = new Date()
      //   console.log('Get now: ', startTime)
      const newEndTime = new Date(startTime.getTime() + 2 * 60000) // 2 minutes in milliseconds
      setEndTime(newEndTime)
      //   console.log('Set end: ', newEndTime)
      localStorage.setItem('time', newEndTime)
    }

    const interval = setInterval(() => {
      if (endTime && new Date() >= endTime && notify.D1 && notify.D2) {
        clearInterval(interval)
        toast('You have finished the user study.')
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [endTime, user])

  // useEffects:
  useEffect(() => {
    localStorage.setItem('prestate', '/quicknews/home')
  }, [])

  useEffect(() => {
    // determine whether need to display notice
    if (notify.D1) {
      // don't need to display
      setAck(true)
    }
  }, [notify, user, navigate])

  useEffect(() => {
    // Get today's date
    const today = new Date()

    // Format date to display month and day
    const options = { month: 'long', day: 'numeric' }
    const newFormattedDate = today.toLocaleDateString('en-US', options)

    // Update state with the formatted date
    setFormattedDate(newFormattedDate)
  }, [])

  return (
    <div>
      {!ack ? (
        <div>
          <Notice image={pn1} handleGet={handleGet} />
        </div>
      ) : (
        <div></div>
      )}
      <CustomToast />
      <div className={styles.main}>
        <div className={styles.title}>
          <div>News</div>
          <div className={styles.time}>{formattedDate}</div>
        </div>
        {orderNews.map((article, index) => (
          <div key={index}>
            <NewsBlock
              article={article}
              handleBlockClick={() => handleBlockClick(article.id)}
            />
          </div>
        ))}
        <div className={styles.footer}>-- End --</div>
      </div>
    </div>
  )
}

export default withAuthorization(transition(Home))
