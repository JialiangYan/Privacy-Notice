const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')
const User = require('../models/userModel')

const logEvent = asyncHandler(async (req, res) => {
  try {
    const { eventName, data, userId } = req.body
    const user = await User.findById(userId)

    if (!user) {
      res.status(400)
      throw new Error('User not found')
    }

    const event = new Event({ eventName, data, userId })
    await event.save()
    res.json({ message: 'Event logged successfully' })
  } catch (error) {
    throw new Error('Error logging event')
  }
})

module.exports = { logEvent }
