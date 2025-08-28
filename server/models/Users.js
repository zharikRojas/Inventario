const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Roles = require('./Roles');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
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
    tableName: 'users',
    timestamps: true
});

Roles.hasMany(Users, {foreignKey: 'roleId'});
Users.belongsTo(Roles, {foreignKey: 'roleId'});

module.exports = Users;
