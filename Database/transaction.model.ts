import { DataTypes } from "sequelize";
import sequelize from "./dbConnection";

export const Transaction = sequelize.define("Transaction", {
  // sequalize generate the id automatically you don need to creat it manually

  amount_total: {
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  payment_status: {
    type: DataTypes.STRING(100),
  },
});
