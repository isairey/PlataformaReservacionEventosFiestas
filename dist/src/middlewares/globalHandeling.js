"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalHandeling = void 0;
const globalHandeling = (error, req, res, next) => {
    let statusCode = error.status || 500;
    res
        .status(statusCode)
        .json({ message: error.message, status: statusCode, stack: error.stack });
};
exports.globalHandeling = globalHandeling;
