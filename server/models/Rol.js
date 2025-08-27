const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Rol = sequelize.define('Rol', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'rol',
    timestamps: true
});

module.exports = Rol;