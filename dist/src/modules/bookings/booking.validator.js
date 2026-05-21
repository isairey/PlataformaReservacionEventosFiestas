"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBookingValidator = exports.bookVenueValidator = void 0;
const express_validator_1 = require("express-validator");
const bookVenueValidator = [
    (0, express_validator_1.body)("date")
        .exists({ checkFalsy: true })
        .withMessage("date is required")
        .isString(),
];
exports.bookVenueValidator = bookVenueValidator;
const cancelBookingValidator = [
    (0, express_validator_1.param)("id")
        .exists()
        .withMessage("id is required")
        .isHexadecimal()
        .withMessage("id must be in hex format"),
];
exports.cancelBookingValidator = cancelBookingValidator;
