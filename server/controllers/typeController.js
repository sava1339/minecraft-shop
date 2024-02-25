const {Type} = require('../models/models')
const ApiError = require('../ApiError/ApiError')
class TypeController{
    async getAll(req,res,next){
        try {
            const type = await Type.findAll()
            return res.json(type)
        }catch (e) {
            return  next(ApiError.InternalServer(e))
        }

    }
    async getOne(req,res,next){
        try {
            const {id} = req.params
            const type = await Type.findOne({where:{id}})
            return res.json(type)
        }catch (e) {
            next(ApiError.badRequest(e))
        }
    }
    async delete(req,res,next){
        const {id} = req.params
        try{
            const type = await Type.destroy({where: {id}})
            return res.json(type)
        }catch (e) {
            next(ApiError.badRequest(e))
        }
    }
    async create(req,res,next){
        try {
            const {name} = req.body
            const type = await Type.create({name})
            return res.json(type)
        }catch (e) {
            if(e.name === 'SequelizeUniqueConstraintError'){
                return res.json("ERROR: Имя должно быть уникальным и не повторяться с предыдущими!")
            }else{
                return next(ApiError.badRequest(e))
            }
        }
    }
}
module.exports = new TypeController()