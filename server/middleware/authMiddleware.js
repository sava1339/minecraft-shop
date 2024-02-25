const jwt = require('jsonwebtoken')
const ApiError = require('../ApiError/ApiError')

module.exports = (req,res,next)=>{
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]//Bearer
        if(token === null || token === undefined || token === "undefined" || token === "null"){
            res.json("Не авторизирован!")
        }else{
            const decoded = jwt.verify(token,process.env.SECRET_KEY)
            req.user = decoded
            next()
        }
    }catch (e) {
        return ApiError.Forbidden("Не авторизирован!")
    }
}