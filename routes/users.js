const express = require('express')
const router = express.Router()

const ctrl = require('../controllers/users')

router.get('/', ctrl.getAllUser)

router.post('/create', ctrl.createUser)

router.post('/login', ctrl.loginUser)

router.delete('/', ctrl.loginUser)

module.exports = router
