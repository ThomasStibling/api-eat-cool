const express = require('express')
const router = express.Router()

const ctrl = require('../controllers/aliments')

router.get('/', ctrl.getItems)

router.get('/:id', ctrl.getItem)

router.post('/', ctrl.postItem)

router.put('/:id', ctrl.patchItem)

router.delete('/:id', ctrl.deleteItem)

module.exports = router
