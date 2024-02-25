const Router = require('express')
const router = new Router
const ServerController = require('../controllers/serverController')

router.get('/:id',ServerController.getOne)
router.get('/',ServerController.getAll)
router.delete('/:id',ServerController.delete)
router.post('/',ServerController.create)

module.exports = router
