import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const track = async (eventName, time, userId) => {
  const res = await apiClient.post('/log/logEvent', {
    eventName,
    data: time,
    userId,
  })
  console.log(res)
  return res
}

export const finishUser = async (userId) => {
  const res = await apiClient.post('/users/finish', { id: userId })
  console.log(res)
  return res
}

export const createUser = async (userId) => {
  const res = await apiClient.post('/users/createUser', { id: userId })
  console.log(res)
  return res
}
