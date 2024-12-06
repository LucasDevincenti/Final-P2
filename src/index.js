import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
import { sequelize } from "./database/database.js";
import app from "./app.js";


const PORT = process.env.PORT || 8000


// import './models/Usuario.js'
async function main() {
    try{
        // await sequelize.authenticate();
        // console.log('La conexión ha sido establecida');
        await sequelize.sync({force: false})
        app.listen(PORT);
        console.log("El servidor ha sido escuchado en el puerto: ", PORT);
    }catch(error){
        console.error("La conexión no ha sido levantada", error);
    }
}

main();