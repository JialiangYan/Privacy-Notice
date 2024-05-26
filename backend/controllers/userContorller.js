const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const createUser = asyncHandler(async (req, res) => {
  const { id } = req.body
  if (!id) {
    res.status(400)
    throw new Error('ID is required')
  }

  try {
    const condition = Math.floor(Math.random() * 10) + 1
    const user = new User({ id, condition })
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
