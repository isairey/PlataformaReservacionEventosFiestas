"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const Roles_1 = require("./Roles");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        reuquired: true
    },
    role: {
        type: String,
        enum: Object.values(Roles_1.Roles),
        default: Roles_1.Roles.USER
    }
});
exports.User = (0, mongoose_1.model)("User", userSchema);
