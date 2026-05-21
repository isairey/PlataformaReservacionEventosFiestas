"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTo = exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const catchErrors_1 = require("./catchErrors");
const appError_1 = require("../utils/appError");
// user signing up
const signUp = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let user = await user_model_1.User.findOne({ email: req.body.email });
    if (user)
        return next(new appError_1.AppError("email already exist please login", 403));
    req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
    user = await user_model_1.User.create(req.body);
    let token = jsonwebtoken_1.default.sign({
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }, process.env.JWT_KEY);
    return res.status(201).json({ message: "success", token });
});
exports.signUp = signUp;
const login = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let user = await user_model_1.User.findOne({ email: req.body.email });
    if (!user || !bcrypt_1.default.compare(req.body.password, user.password))
        return next(new appError_1.AppError("incorrect email or password", 403));
    // sign a token
    let token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_KEY);
    return res
        .status(201)
        .json({ message: `welcome back ${user.name}`, token });
});
exports.login = login;
const allowedTo = function (...roles) {
    return (0, catchErrors_1.catchError)(async (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new appError_1.AppError('you are not authorized', 401));
        next();
    });
};
exports.allowedTo = allowedTo;
