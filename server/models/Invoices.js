const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');

const Invoices = sequelize.define('Invoices', {
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
    tableName: 'invoices',
    timestamps: true
});

Invoices.belongsTo(Users, {foreignKey: 'userId'});
Users.hasMany(Invoices, {foreignKey: 'userId'});

module.exports = Invoices;
