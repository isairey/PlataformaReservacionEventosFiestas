"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const catchError = function (fn) {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            // res.json({ message: err.message });
            next(err);
        });
    };
};
exports.catchError = catchError;
