const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
