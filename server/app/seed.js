const Roles = require('../models/Roles');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

async function seed() {
    const roles = [
        { name: 'Admin' },
        { name: 'Client' }
    ];
    
    for(const role of roles ) {
        const [rol, created] = await Roles.findOrCreate({
            where: { name: role.name },
            defaults: { name: role.name }
        });

        if (created) {
            console.log(`Rol creado: ${rol.name}`);
        } else {
            console.log(`Rol ya existe: ${rol.name}`);
        }
    }
    const rolesExisted = await Roles.findAll();
    const users = [
        {
            name: 'Claudia Perez',
            email: 'clauPerez@example.com',
            password: 'admin123',
            role: rolesExisted.find(role => role.name === 'Admin').id
        },
        {
            name: 'Jose Gomez',
            email: 'joseGomez@example.com',
            password: 'client123',
            role: rolesExisted.find(role => role.name === 'Client').id
        }
    ]
    for(const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const [usr, created] = await Users.findOrCreate({
            where: { email: user.email },
            defaults: { name: user.name, email: user.email, password: hashedPassword, roleId: user.role }
        });

        if (created) {
            console.log(`Usuario creado: ${usr.name}`);
        } else {
            console.log(`Usuario ya existe: ${usr.name}`);
        }
    }
}

module.exports = seed;