require('dotenv').config({path: __dirname+'/.env'})
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const path = require('path')
const route = require('./routes/index')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use('/options',express.static(path.resolve(__dirname,'options')))
app.use(fileUpload({}))
app.use('/api',route)


app.use(errorHandler)

const PORT = process.env.PORT || 5001
const start = () =>{
    try {
        sequelize.authenticate()
        sequelize.sync()
        app.listen(PORT,()=>console.log(`port listen ${PORT}`))
    }catch (e) {
        console.error(e)
    }
}
start()