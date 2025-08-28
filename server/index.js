const {app, initializeDB} = require('./app/app');
const PORT = require('./config/config').PORT;

async function main(){
    await initializeDB();
}
main();