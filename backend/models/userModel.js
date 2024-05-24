const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const userSchema = mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  condition: {
    type: Number,
    required: true,
  },
  permission: { type: Boolean, default: true },
})

module.exports = mongoose.model('User', userSchema)
