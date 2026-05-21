"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserValidator = exports.updateUserValidator = exports.loginValidator = exports.SignupValidator = void 0;
const express_validator_1 = require("express-validator");
const SignupValidator = [
    (0, express_validator_1.body)("name").exists({ checkFalsy: true }).isLength({ min: 3 }),
    (0, express_validator_1.body)("email").exists({ checkFalsy: true }).isEmail(),
    (0, express_validator_1.body)("password")
        .exists({ checkFalsy: true })
        .withMessage("password is required")
        .isLength({ min: 5 })
        .withMessage("password length must be atleast 5"),
    (0, express_validator_1.body)("role").isLength({ max: 5 }),
];
exports.SignupValidator = SignupValidator;
const loginValidator = [
    (0, express_validator_1.body)("email")
        .exists({ checkFalsy: true })
        .withMessage("email is required")
        .isEmail()
        .withMessage("this field must be in in an email form"),
    (0, express_validator_1.body)("password")
        .exists({ checkFalsy: true })
        .withMessage("password is required"),
];
exports.loginValidator = loginValidator;
const updateUserValidator = [
    (0, express_validator_1.param)("id")
        .exists({ checkFalsy: true })
        .withMessage("id is required")
        .isHexadecimal()
        .withMessage(" id must be in hex format")
        .escape(),
    (0, express_validator_1.body)("name").isLength({ min: 3 }),
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("role").isLength({ max: 5 }),
];
exports.updateUserValidator = updateUserValidator;
const deleteUserValidator = (0, express_validator_1.param)("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .isHexadecimal()
    .withMessage(" id must be in hex format")
    .escape();
exports.deleteUserValidator = deleteUserValidator;
