const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Counter = require('../models/counterModel')
const numbers = [9, 3, 3, 3, 2, 2, 5, 5, 4, 4]

// Helper functions

const returnNews = () => {
  function shuffleArray(array) {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]
    }
    return shuffledArray
  }
  let ids = [0, 1, 2, 3, 4, 5]
  let shuffledIds = shuffleArray(ids)
  return shuffledIds
}

// Controllers
const createUser = asyncHandler(async (req, res) => {
  const { id } = req.body
  if (!id) {
    res.status(400)
    throw new Error('ID is required')
  }

  const user = await User.findOne({ id })
  if (user && !user.permission) {
    // if user has been created and finished
    res.status(409)
    const error = new Error('User ID already exists')
    error.code = 11000
    throw error
  } else if (user && user.permission) {
    // if user has been created but not finished
    res.json({ message: 'Successfully create user', user })
  } else {
    // if user has not been created
    try {
      // generate condition
      let counter = await Counter.findOne()
      const condition = 6
      counter.number++
      if (counter.number > 9) {
        counter.number = 0
      }
      await counter.save()
      const news = [...returnNews()]
      const user = new User({ id, condition, news }) // create new user
      await user.save()
      res.json({ message: 'Successfully create user', user })
    } catch (error) {
      res.status(500)
      throw new Error('Error creating user')
    }
  }
})

const finishParticipation = asyncHandler(async (req, res) => {
  const { id } = req.body
  if (!id) {
    res.status(400)
    throw new Error('ID is required')
  }

  try {
    const user = await User.findOneAndUpdate(
      { id },
      { permission: false },
      { new: true }
    )
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }
    res.json({ message: 'Participation finished', user })
  } catch (error) {
    res.status(500)
    throw new Error('Error finishing participation')
  }
})

module.exports = { createUser, finishParticipation }
