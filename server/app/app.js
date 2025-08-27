const express = require('express');
const {Sequelize} = require('sequelize');
const sequelize = require('../config/database');
const Rol = require('../models/Rol');
const Usuario = require('../models/Usuario');
const config = require('../config/config');
const app = express();
app.use(express.json());

async function initializeDB(){
    try {
        const sequelizeMaster = new Sequelize('',config.DB.USER, config.DB.PASSWORD, {
            host: config.DB.HOST,
            dialect: 'mysql'
        })
        await sequelizeMaster.query(`CREATE DATABASE IF NOT EXISTS ${config.DB.DATABASE}`);
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (error) {
        console.error('Error creando base de datos:', error);
    }
}

module.exports = {app, initializeDB};