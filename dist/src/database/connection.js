import { Sequelize } from "sequelize-typescript";
import User from "./model/user.model.js";
import dotenv from "dotenv";
dotenv.config();
console.log("Database name:", process.env.DB_NAME);
const sequliize = new Sequelize({
    database: process.env.DB_NAME, // database ko name
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "", // database ko password
    host: process.env.DB_HOST, // database kaha host garne ho
    port: Number(process.env.DB_PORT || "3306"), // database ko port number 3306 //  // parseInt le string lai number ma convert garne ho
    dialect: "mysql", // database ko dialect mysql, postgres, sqlite, mssql
    models: [User], // models ko array, jasma hamro user model xa, tyo database sanga connect garne ho
});
sequliize.authenticate()
    .then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection error:", err);
});
// migration run garne ho
sequliize.sync({ alter: true }) // alter: true le database ko structure lai model sanga match garne ho, tyo table ma kunai column add, remove, change bhaye tyo automatically update garne ho
    .then(() => {
    console.log("Database synchronized successfully");
}).catch((err) => {
    console.error("Database synchronization error:", err);
});
export default sequliize;
