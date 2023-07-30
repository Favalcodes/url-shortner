const express = require('express')
const { createUser, loginUser } = require('./services/userService')
const { getUserUrl, shortenUrl } = require('./services/urlService')
const validateToken = require('./validator/tokenValidator')

const router = express.Router()
router.post('/create-user', createUser)
router.get('/user-url/:id', validateToken, getUserUrl)
router.post('/shorten-url', validateToken, shortenUrl)
router.post('/login-user', loginUser)

module.exports = router