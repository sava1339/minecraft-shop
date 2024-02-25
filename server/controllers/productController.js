const {OtherProduct} = require('../models/models')
const ApiError = require("../ApiError/ApiError");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const axios = require("axios")
class ProductController{
    async getBuyings(req, res,next){
        try {
            const promise = (await axios.get(`${process.env.URL}lastBuyings.php?key=${process.env.KEY}`)).data
            return res.json(promise.response)
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }
    async getAdminActive(req, res,next){
        try {
            return res.json(process.env.ADMINMODE)
        }catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
    async getPayment(req, res,next){
        try {
            const {customer,serverId,products,email,promo} = req.body
            const promise = (await axios.get(`${process.env.URL}makeEasyDonatePayment.php?customer=${customer}&server_id=${serverId}&products=${products}&email=${email}&coupon=${promo}&key=${process.env.KEY}`)).data
            return res.json(promise)
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }
    async getAll(req, res,next) {
        try {
            const {typeId,serverId} = req.query
            try {
                if(!typeId && !serverId){
                    const product = await OtherProduct.findAll()
                    return res.json(product)
                }
                if(typeId && !serverId){
                    const product = await OtherProduct.findAll({where:{typeId}})
                    return res.json(product)
                }
                if(!typeId && serverId){
                    const product = await OtherProduct.findAll({where:{serverId}})
                    return res.json(product)
                }
                if(typeId && serverId){
                    const product = await OtherProduct.findAll({where:{typeId,serverId}})
                    return res.json(product)
                }
            }catch (e) {
                return  next(ApiError.InternalServer(e))
            }
            const otherProduct = await OtherProduct.findAll()
            return res.json(otherProduct)
        }catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
    async getOne(req, res,next) {
        try {
            const {id} = req.params
            const otherProduct = await OtherProduct.findOne({where: {id}})
            return res.json(otherProduct)
        }catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
    async delete(req,res,next){
        try {
            const {id} = req.params
            let otherProduct = await OtherProduct.findOne({where: {id}})
            const pathImage = path.resolve(__dirname, '..', 'static', String(otherProduct.image))
            await fs.unlink(pathImage, async(err)=>{
                if(err){
                    return res.json(err)
                }else{
                    otherProduct = await OtherProduct.destroy({where:{id}})
                    return res.json(otherProduct)
                }
            })
        }catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
    async deleteForServer(req,res,next){
        try {
            const {id} = req.params
            let otherProduct = await OtherProduct.findAll({where: {serverId:+id}})
            if(otherProduct.length > 0){
                otherProduct.map(async(el)=>{
                    const pathImage = path.resolve(__dirname, '..', 'static', String(el.image))
                    await fs.unlink(pathImage, async(err)=>{
                        if(err){
                            return res.json(err)
                        }else{
                            otherProduct = await OtherProduct.destroy({where:{id:el.id}})
                            return res.json(otherProduct)
                        }
                    })
                })
            }else{
                return res.json(true)
            }

        }catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
    async deleteForType(req,res,next){
        try {
            const {id} = req.params
            let otherProduct = await OtherProduct.findAll({where: {typeId:+id}})
            if(otherProduct.length > 0){
                otherProduct.map(async(el)=>{
                    const pathImage = path.resolve(__dirname, '..', 'static', String(el.image))
                    await fs.unlink(pathImage, async(err)=>{
                        if(err){
                            return res.json(err)
                        }else{
                            otherProduct = await OtherProduct.destroy({where:{id:el.id}})
                            return res.json(otherProduct)
                        }
                    })
                })
            }else{
                return res.json(true)
            }

        }catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
    async create(req, res,next) {
        try {
            const {name,authenticator,price,count,plural,max,serverId,typeId} = req.body
            const {image} = req.files
            let imageFileName = uuid.v4()+".png"
            const otherProduct = await OtherProduct.create({name,authenticator,price,image:imageFileName,count,plural,max,serverId,typeId})
            await image.mv(path.resolve(__dirname,'..','static', imageFileName))
            return res.json(otherProduct)
        }catch (e) {
            if(e.name === 'SequelizeUniqueConstraintError'){
                return res.json("ERROR: Имя должно быть уникальным и не повторяться с предыдущими!")
            }else{
                return next(ApiError.badRequest(e))
            }
        }
    }
}
module.exports = new ProductController()