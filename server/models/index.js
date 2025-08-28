const sequelize = require('../config/database')

const Roles = require('./Roles');
const Users = require('./Users');
const Products = require('./Products');
const Invoices = require('./Invoices');
const Orders = require('./Orders');

module.exports = {
    Roles,
    Users,
    Products,
    Invoices,
    Orders,
    sequelize
};
