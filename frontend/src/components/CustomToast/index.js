import React from 'react'
import { ToastContainer, Slide } from 'react-toastify'
import throttle from 'lodash/throttle'
import { finishUser } from '../../utils/request'
import './customToastify.css'

const CloseButton = () => {
  const throttledExit = throttle(async (pid) => {
    const id = await finishUser(pid)
    localStorage.setItem('prestate', '/error')
    window.location.href = `https://ualbertauw.qualtrics.com/jfe/form/SV_3R8gIdZxs3lKR6u/?PROLIFIC_PID=${id}`
  }, 10000)

  return (
    <div
      className="exitButton"
      onClick={() => {
        throttledExit(JSON.parse(localStorage.getItem('user')).pid)
      }}
    >
      Enter Exit Survey
    </div>
  )
}

const CustomToast = () => {
  return (
    <div>
      <ToastContainer
        autoClose={false}
        limit={1}
        rtl={false}
        theme="light"
        transition={Slide}
        closeButton={CloseButton}
      />
    </div>
  )
}

export default CustomToast
