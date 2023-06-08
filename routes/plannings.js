const express = require('express')
const router = express.Router()

const ctrl = require('../controllers/plannings')

router.get('/', ctrl.getItems)

router.get('/:id', ctrl.getItem)

router.get('/:user/:date', ctrl.getItemPerDayForUser)

router.post('/', ctrl.postItem)

router.patch('/:id', ctrl.patchItem)

router.delete('/:id', ctrl.deleteItem)

module.exports = router
