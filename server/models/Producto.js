const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lote: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unitValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    cant_available: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_in: {
        type: DataTypes.DATE,
        allowNull: false
    },   
},{
    tableName: 'producto',
    timestamps: true
});

module.exports = Producto;