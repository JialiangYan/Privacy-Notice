const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Counter = require('../models/counterModel')

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
  if (await User.findOne({ id })) {
    const error = new Error('User ID already exists')
    error.code = 11000
    throw error
  }

  try {
    // generate condition
    let counter = await Counter.findOne()
    if (!counter) {
      counter = new Counter({ number: 1 })
      await counter.save()
    } else {
      counter.number++
      if (counter.number > 9) {
        counter.number = 1
      }
      await counter.save()
    }
    const condition = counter.number
    const news = [...returnNews()]
    const user = new User({ id, condition, news })
    await user.save()
    res.json({ message: 'Successfully create user', user })
  } catch (error) {
    if (error.code === 11000) {
      res.status(409)
      throw new Error('User id already exits')
    } else {
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
