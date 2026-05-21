"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConn = void 0;
const sequelize_1 = require("sequelize");
const mongoose_1 = __importDefault(require("mongoose"));
const dbConn = () => {
    mongoose_1.default
        .connect(process.env.DB_URI)
        .then(() => {
        console.log("DB connected");
    })
        .catch(() => {
        console.log("Err DB Connection");
    });
};
exports.dbConn = dbConn;
const sequelize = new sequelize_1.Sequelize("party-booking system", "root", "", {
    host: process.env.MYSQL_BASE_URI,
    dialect: "mysql",
});
// test database connection
sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((err) => console.error("Unable to connect to the database:"));
exports.default = sequelize;
