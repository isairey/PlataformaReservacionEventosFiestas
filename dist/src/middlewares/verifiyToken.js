"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verfifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../utils/appError");
const user_model_1 = require("../modules/user/user.model");
const verfifyToken = (req, res, next) => {
    const token = req.headers?.token;
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err)
            return next(new appError_1.AppError("inavlid token", 401));
        let user = await user_model_1.User.findById(decoded.userId);
        // console.log(user);
        if (!user)
            return next(new appError_1.AppError("user not found", 404));
        req.user = decoded;
        next();
    });
};
exports.verfifyToken = verfifyToken;
