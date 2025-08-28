const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Products = sequelize.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
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
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },   
},{
    tableName: 'products',
    timestamps: true
});

module.exports = Products;