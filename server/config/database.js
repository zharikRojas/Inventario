const {Sequelize} = require('sequelize');
const config = require('./config')

const sequelize = new Sequelize (
    config.DB.DATABASE,
    config.DB.USER,
    config.DB.PASSWORD,
    {
        host: config.DB.HOST,
        dialect: 'mysql'
    }
)

module.exports = sequelize;