const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Invoices = require('./Invoices');
const Products = require('./Products');

const Orders = sequelize.define('Orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    units: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sale_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: true
});

Invoices.hasMany(Orders, {foreignKey: 'idInvoice'});
Orders.belongsTo(Invoices, {foreignKey: 'idInvoice'});
Products.hasMany(Orders, {foreignKey: 'idProduct'});
Orders.belongsTo(Products, {foreignKey: 'idProduct'});

module.exports = Orders;
