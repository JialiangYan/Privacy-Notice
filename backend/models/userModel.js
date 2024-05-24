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
  permission: { type: Boolean, default: true },
})

module.exports = mongoose.model('User', userSchema)
