const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Factura = require('./Factura');
const Producto = require('./Producto');

const ProductoVendido = sequelize.define('ProductoVendido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cant_purchased: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'producto_vendido',
    timestamps: true
});

Factura.hasMany(ProductoVendido, {foreignKey: 'idFactura'});
ProductoVendido.belongsTo(Factura, {foreignKey: 'idFactura'});

module.exports = ProductoVendido;
