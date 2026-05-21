"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("./dbConnection"));
exports.Transaction = dbConnection_1.default.define("Transaction", {
    // sequalize generate the id automatically you don need to creat it manually
    amount_total: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
    },
    payment_status: {
        type: sequelize_1.DataTypes.STRING(100),
    },
});
