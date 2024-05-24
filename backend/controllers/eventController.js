const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')
const User = require('../models/userModel')

const logEvent = asyncHandler(async (req, res) => {
  const { eventName, data, userId } = req.body
  if (!eventName || !data || !userId) {
    res.status(400)
    throw new Error('eventName, data, userId are required')
  }

  try {
    const user = await User.findOne({ id: userId })

    if (!user) {
      res.status(400)
      throw new Error('User not found')
    }

    const event = new Event({ eventName, data, userId })
    await event.save()
    res.json({ message: 'Event logged successfully' })
  } catch (error) {
    res.status(500)
    throw new Error('Error logging event')
  }
})

module.exports = { logEvent }
