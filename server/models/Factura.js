const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Factura = sequelize.define('Factura', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
}, {
    tableName: 'factura',
    timestamps: true
});

Factura.belongsTo(Usuario, {foreignKey: 'usuarioId'});
Usuario.hasMany(Factura, {foreignKey: 'usuarioId'});

module.exports = Factura;
