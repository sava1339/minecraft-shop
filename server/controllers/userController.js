const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../ApiError/ApiError')
const {User} = require('../models/models')

const generateJWT = (id,login) =>{
    return jwt.sign(
        {id,login},
        process.env.SECRET_KEY,
        {expiresIn:"24h"}
    )
}

class UserController{
    async registration(req,res,next){
        try {
            const {login,password} = req.body
            const candidate = await User.findOne({where:{login}})
            if(candidate){
                return next(ApiError.badRequest('Пользователь с таким email существует!'))
            }
            const hashPassword = await bcrypt.hash(password,5)
            const user = await User.create({login:login,password:hashPassword})
            const token = generateJWT(user.id,user.login)
            return res.json({token})
        }catch (e) {
            next(ApiError.badRequest(e))
        }
    }
    async login(req,res,next){
        try {
            const {login,password} = req.body
            const user = await User.findOne({where:{login}})
            if(!user){
                return next(ApiError.InternalServer('Пользователь не найден!'))
            }
            let comparePassword = bcrypt.compareSync(password,user.password)
            if(!comparePassword){
                return next(ApiError.InternalServer('Неверный пароль!'))
            }
            const token = generateJWT(user.id,user.login)
            return res.json({token})
        }catch (e) {
            next(ApiError.badRequest(e))
        }
    }
    async check(req,res,next){
        try {
            const token = generateJWT(req.user.id,req.user.login)
            return res.json({token})
        }catch (e) {
            return next(ApiError.InternalServer(e))
        }
    }
}
module.exports = new UserController()