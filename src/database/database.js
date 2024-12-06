import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('burgery','root','1234',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306  // Cambia esto si MySQL usa otro puerto
})