const express = require('express')
const router = express.Router()
const {
  createUser,
  finishParticipation,
} = require('../controllers/userContorller')

router.get('/createUser', createUser)
router.post('/finish', finishParticipation)

module.exports = router
