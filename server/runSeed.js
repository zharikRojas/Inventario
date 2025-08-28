
const { initializeDB } = require('./app/app');
const seed = require('./app/seed');
const db = require('./models'); 

async function run() {
    await initializeDB();
    await seed();
    
}

run().catch(error => {
    console.error('Ocurrió un error durante la inserción de datos:', error);
}).finally(() => {
    db.sequelize.close();
});