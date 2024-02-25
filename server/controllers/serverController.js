const {Server}  = require('../models/models')
const ApiError = require('../ApiError/ApiError')
class ServerController {
    async create(req,res,next){
        try {
            const {name,authenticator} = req.body
            const server = await Server.create({name,authenticator})
            return res.json(server)
        }catch (e){
            if(e.name === 'SequelizeUniqueConstraintError'){
                return res.json("ERROR: Имя должно быть уникальным и не повторяться с предыдущими!")
            }else{
                return next(ApiError.badRequest(e))
            }
        }
    }
    async delete(req,res,next){
        try {
            const {id} = req.params
            const server = await Server.destroy({where:{id}})
            return res.json(server)
        }catch (e) {
            next(ApiError.badRequest(e))
        }
    }
    async getAll(req,res,next){
        try {
            const server = await Server.findAll()
            return res.json(server)
        }catch (e) {
            return  next(ApiError.InternalServer(e))
        }
    }
    async getOne(req,res,next){
        try {
            const {id} = req.params
            const server = await Server.findOne({where:{id}})
            return res.json(server)
        }catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
}
module.exports = new ServerController()