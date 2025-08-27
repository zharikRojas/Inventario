const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');

async function createUser(req, res) {
    const { email, password, nombre } = req.body;
    const rol = await Rol.findOne({ where: { name: 'Cliente' } });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({
            email,
            password: hashedPassword,
            nombre,
            rolId: rol.id
        });
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
}

async function getUsers(req, res) {
    try {
        const usuarios = await Usuario.findAll({
            include: [{ model: Rol }]
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
}