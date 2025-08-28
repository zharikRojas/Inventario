const express = require('express');
const {Sequelize} = require('sequelize');
const config = require('../config/config');
const cors = require('cors');
const app = express();
const db = require('../models');
const routes = require('./routes/index');

app.use(cors()); 
app.use(express.json());
app.use('/api/users', routes.usersRoutes);
app.use('/api/login', routes.loginRoutes);
app.use('/api/products', routes.ProductsRoutes);
app.use('/api/invoices', routes.InvoicesRoutes);

async function initializeDB(){
    try {
        const sequelizeMaster = new Sequelize('',config.DB.USER, config.DB.PASSWORD, {
            host: config.DB.HOST,
            dialect: 'mysql'
        })
        await sequelizeMaster.query(`CREATE DATABASE IF NOT EXISTS ${config.DB.DATABASE}`);
        await db.sequelize.authenticate();
        await db.sequelize.sync();
    } catch (error) {
        console.error('Error creando base de datos:', error);
    }
}

module.exports = {app, initializeDB};