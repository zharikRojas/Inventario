const Rol = require('../models/Rol');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

async function seed() {
    const roles = [
        { name: 'Administrador' },
        { name: 'Cliente' }
    ];

    for(const role of roles ) {
        const [rol, created] = await Rol.findOrCreate({
            where: { name: role.name },
            defaults: { name: role.name }
        });

        if (created) {
            console.log(`Rol creado: ${rol.name}`);
        } else {
            console.log(`Rol ya existe: ${rol.name}`);
        }
    }
    
}

module.exports = seed;