import axios from 'axios'
import { toast, Slide } from 'react-toastify'

const apiClient = axios.create({
  baseURL: 'https://privacy-notice.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const track = async (eventName, time, userId) => {
  try {
    const res = await apiClient.post('/log/logEvent', {
      eventName,
      data: time,
      userId,
    })
    console.log(res.data.message)
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

export const finishUser = async (userId) => {
  try {
    const res = await apiClient.post('/users/finish', { id: userId })
    console.log(res.data.message)
    localStorage.clear()
    alert(
      'You have finished the user study. You will be directed to the post-study questionnaire automatically.'
    )
    setTimeout(() => {
      window.location.href =
        'https://ualbertauw.qualtrics.com/jfe/form/SV_3R8gIdZxs3lKR6u'
    }, 3000)
  } catch (error) {
    console.log('Error finsih participation', error)
    alert('Sorry, there is something wrong with the server')
  }
}

export const createUser = async (userId, navigate) => {
  try {
    const res = await apiClient.post('/users/createUser', { id: userId })
    console.log(res.data.message, res.data.user.id)
    const user = {
      pid: res.data.user.id,
      condition: res.data.user.condition,
      permission: res.data.user.permission,
    }
    const notify = {
      D1: false,
      D2: false,
    }
    localStorage.setItem('notify', JSON.stringify(notify))
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('tnum', 0) // set finished task num
    navigate('/appstore')
  } catch (error) {
    console.error('Error create user', error)
    if (error.response && error.response.status === 409) {
      alert('You have already participated this study before')
    } else {
      alert('Sorry, there is something wrong with the server')
    }
  }
}
