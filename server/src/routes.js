const express = require('express')
const { createUser, loginUser } = require('./services/userService')
const { getUserUrl, shortenUrl, getUrl } = require('./services/urlService')

const router = express.Router()

router.post('api/create-user', createUser)
router.get('api/user-url/:id', getUserUrl)
router.get(':url', getUrl)
router.post('api/shorten-url', shortenUrl)
router.post('api/login-user', loginUser)

module.exports = router