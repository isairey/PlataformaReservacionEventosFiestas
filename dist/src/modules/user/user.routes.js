"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const ua = __importStar(require("../../middlewares/auth"));
const uc = __importStar(require("../user/user.controller"));
const Roles_1 = require("./Roles");
const verifiyToken_1 = require("../../middlewares/verifiyToken");
const validate_request_1 = require("../../middlewares/validate-request");
const user_validator_1 = require("./user.validator");
exports.userRouter = (0, express_1.Router)();
exports.userRouter
    .post("/auth/signup", user_validator_1.SignupValidator, validate_request_1.validateRequest, ua.signUp)
    .post("/auth/login", user_validator_1.loginValidator, validate_request_1.validateRequest, ua.login)
    .use(verifiyToken_1.verfifyToken)
    .patch("/users/:id", user_validator_1.updateUserValidator, validate_request_1.validateRequest, ua.allowedTo(Roles_1.Roles.ADMIN), uc.updateUser)
    .delete("/users/:id", user_validator_1.deleteUserValidator, validate_request_1.validateRequest, ua.allowedTo(Roles_1.Roles.ADMIN), uc.deleteUser)
    .get("/users", uc.getAllUsers)
    .get("/users/:id", user_validator_1.updateUserValidator, validate_request_1.validateRequest, uc.getUser);
