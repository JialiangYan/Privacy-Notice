const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

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

  try {
    const condition = Math.floor(Math.random() * 9) + 1
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
