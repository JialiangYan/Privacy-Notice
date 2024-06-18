const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  condition: {
    type: Number,
    required: true,
  },
  news: {
    type: [Number],
    default: [0, 1, 2, 3, 4, 5],
    required: true,
  },
  permission: { type: Boolean, default: true },
})

module.exports = mongoose.model('User', userSchema)
