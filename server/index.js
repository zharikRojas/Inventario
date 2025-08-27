const {app, initializeDB} = require('./app/app');
const seed = require('./app/seed');
async function main(){
    await initializeDB();
    await seed();
    app.listen(3000, () => {
        console.log('Servidor corriendo en el puerto 3000');
    });
}
main();