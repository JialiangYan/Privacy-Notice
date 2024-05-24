const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const createUser = asyncHandler(async (req, res) => {
  try {
    const condition = Math.floor(Math.random() * 10) + 1
    const user = new User({ condition })
    await user.save()
    res.json({
      uuid: user.uuid,
      permission: user.permission,
      condition: user.condition,
    })
  } catch (error) {
    throw new Error('Error creating user')
  }
})

const finishParticipation = asyncHandler(async (req, res) => {
  try {
    const { uuid } = req.body
    const user = await User.findOneAndUpdate(
      { uuid },
      { permission: false },
      { new: true }
    )
    if (!user) {
      res.status(400)
      throw new Error('User not found')
    }
    res.json({ message: 'Participation finished', user })
  } catch (error) {
    throw new Error('Error finishing participation')
  }
})

module.exports = { createUser, finishParticipation }
