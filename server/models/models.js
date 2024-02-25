const {DataTypes, INTEGER} = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    login:{type:DataTypes.STRING,allowNull:false},
    password:{type:DataTypes.STRING,allowNull: false}
})
const Server = sequelize.define('server',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING(32),unique:true,allowNull:false},
    authenticator:{type:DataTypes.STRING,allowNull:false}
})
const Type = sequelize.define('type',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING(32),unique:true,allowNull:false}
})
const OtherProduct = sequelize.define('other_product',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING(32),allowNull:false},
    price:{type:DataTypes.INTEGER,allowNull:false},
    image:{type:DataTypes.STRING,allowNull:true},
    count:{type:DataTypes.INTEGER,allowNull:false},
    plural:{type:DataTypes.INTEGER,allowNull:false},
    max:{type:INTEGER,allowNull:true},
    authenticator:{type:DataTypes.STRING,allowNull:false}
})
const Buying = sequelize.define('buying',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    nickname:{type:DataTypes.STRING(32),allowNull:false},
    description:{type:DataTypes.STRING,allowNull:false},
})

Server.hasMany(OtherProduct)
OtherProduct.belongsTo(Server)

Type.hasMany(OtherProduct)
OtherProduct.belongsTo(Type)

Server.hasMany(Buying)
Buying.belongsTo(Server)

module.exports = {
    User,
    Server,
    Type,
    OtherProduct,
    Buying
}