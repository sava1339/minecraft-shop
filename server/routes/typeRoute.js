const Router = require('express')
const router = new Router
const TypeController = require("../controllers/typeController");


router.get('/',TypeController.getAll)
router.get('/:id',TypeController.getOne)
router.delete('/:id',TypeController.delete)
router.post('/',TypeController.create)

module.exports = router