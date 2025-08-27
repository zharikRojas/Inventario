const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Rol = require('./Rol');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario',
    timestamps: true
});

Rol.hasMany(Usuario, {foreignKey: 'rolId'});
Usuario.belongsTo(Rol, {foreignKey: 'rolId'});

module.exports = Usuario;
