const Router = require('express')
const router = new Router
const ServerRoute = require('./serverRoute')
const TypeRoute = require('./typeRoute')
const ProductRoute = require('./productRoute')
const UserRoute = require('./userRoute')

router.use('/type',TypeRoute)
router.use('/server',ServerRoute)
router.use('/product',ProductRoute)
router.use('/user',UserRoute)

module.exports = router
