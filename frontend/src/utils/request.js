import axios from 'axios'
import { startTransition } from 'react'

const apiClient = axios.create({
  baseURL: 'https://privacy-notice.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const track = async (eventName, data, userId) => {
  try {
    const res = await apiClient.post('/log/logEvent', {
      eventName,
      data,
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
    return res.data.user.id
  } catch (error) {
    console.log('Error finsih participation', error)
    alert('Sorry, there is something wrong with the server')
  }
}

export const createUser = async (userId, navigate) => {
  try {
    const res = await apiClient.post('/users/createUser', { id: userId })
    console.log(res.data.message, res.data.user.id)
    const cond = res.data.user.condition // real condition
    // const cond = 9 // for test
    const user = {
      pid: res.data.user.id,
      condition: cond,
      permission: res.data.user.permission,
      newsOrder: res.data.user.news || [0, 1, 2, 3, 4, 5],
    }
    const noticeSwitch = cond == 5 || cond == 7 || cond == 8 || cond == 9
    const notify = {
      D1: !noticeSwitch,
      D2: !noticeSwitch,
    }
    localStorage.clear()
    localStorage.setItem('notify', JSON.stringify(notify))
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('prestate', `/?PROLIFIC_PID=${user.pid}`)
    startTransition(() => {
      navigate('/inst', { state: { valid: true } })
    })
  } catch (error) {
    console.error('Error create user', error)
    if (error.response && error.response.status === 409) {
      alert('You have already participated this study before')
    } else {
      alert(
        `Sorry, there is something wrong with the server - userid: ${userId}`
      )
    }
  }
}
