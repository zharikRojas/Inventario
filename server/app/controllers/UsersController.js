const Users = require('../../models/Users');
const Roles = require('../../models/Roles');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
    const { email, password, name } = req.body;
    const rol = await Roles.findAll();
    if (!rol || rol.length === 0) {
        return res.status(400).json({ error: 'No hay Roles existentes' });
    }
    const roleId = rol.find(r => r.name === 'Client').id;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            email,
            password: hashedPassword,
            name,
            roleId: roleId
        });
        const newResponse = {
            id: user.id,
            email: user.email,
            name: user.name,
            roleId: user.roleId
        }
        res.status(201).json(newResponse);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario', errorDetails: error.message } );
    }
}

async function getUsers(req, res) {
    try {
        const usuarios = await Users.findAll({
            include: [{ model: Roles }, {attributes: ['id', 'name', 'email', 'roleId']}]
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
}

module.exports = {
    createUser,
    getUsers
};