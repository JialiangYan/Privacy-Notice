const express = require('express')
const router = express.Router()
const { logEvent } = require('../controllers/eventController')

router.post('/logEvent', logEvent)

module.exports = router
