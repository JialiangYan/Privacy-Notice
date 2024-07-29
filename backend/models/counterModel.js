const mongoose = require('mongoose')

const counterSchema = mongoose.Schema({
  number: {
    type: Number,
    default: 0,
    required: true,
  },
})

module.exports = mongoose.model('Counter', counterSchema)
