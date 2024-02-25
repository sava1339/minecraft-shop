const Router = require('express')
const router = new Router
const OtherProductController = require('../controllers/productController')

router.get('/',OtherProductController.getAll)
router.get('/admin',OtherProductController.getAdminActive)
router.get('/:id',OtherProductController.getOne)
router.post('/pay',OtherProductController.getPayment)
router.post('/buyings',OtherProductController.getBuyings)
router.delete('/:id',OtherProductController.delete)
router.delete('/for-server/:id',OtherProductController.deleteForServer)
router.delete('/for-type/:id',OtherProductController.deleteForType)
router.post('/',OtherProductController.create)

module.exports = router
