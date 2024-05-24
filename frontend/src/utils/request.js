import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const logEvent = (eventName, data, userId) => {
  return apiClient.post('/log/logEvent', {
    eventName,
    data,
    userId,
  })
}

export const finishUser = (userId) => {
  return apiClient.post('/users/finish', { id: userId })
}

export const createUser = (userId) => {
  return apiClient.post('/users/createUser', { id: userId })
}
