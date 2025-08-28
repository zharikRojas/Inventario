const Users = require('../../models/Users');
const Roles = require('../../models/Roles');
const bcrypt = require('bcrypt');
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const usuario = await Users.findOne({ where: { email },
        include: {
            model: Roles,
            attributes: ['name']
        }});
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const isValidPassword = await bcrypt.compare(password, usuario.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Login exitoso', usuario });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en login' });
    }
}

module.exports = { login };