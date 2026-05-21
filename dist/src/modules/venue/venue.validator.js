"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVenueValidation = exports.getVenueValidation = exports.createVenueValidation = void 0;
const express_validator_1 = require("express-validator");
const appError_1 = require("../../utils/appError");
const moment_1 = __importDefault(require("moment"));
const datehandeling_1 = require("../bookings/datehandeling");
const createVenueValidation = [
    (0, express_validator_1.body)("name")
        .exists({ checkFalsy: true })
        .withMessage("name is required")
        .isLength({ min: 5 })
        .withMessage("name must be at least 5 characters long"),
    (0, express_validator_1.body)("desc").exists({ checkFalsy: true }).withMessage("desc is required"),
    (0, express_validator_1.body)("location")
        .exists({ checkFalsy: true })
        .withMessage("location is required")
        .isLength({ min: 5 })
        .withMessage("location must be at least 5 characters long"),
    (0, express_validator_1.body)("price")
        .exists({ checkFalsy: true })
        .withMessage("price is required")
        .isFloat({ gt: 0 })
        .withMessage("price must be a positive number"),
    (0, express_validator_1.body)("availability")
        .exists({ checkFalsy: true })
        .withMessage("availability is required ")
        .custom((value, { req }) => {
        if (!Array.isArray(value)) {
            throw new Error("Availability must be an array of dates");
        }
        const today = (0, moment_1.default)().startOf("day");
        const datesSet = new Set();
        value.forEach((date) => {
            if (!(0, moment_1.default)(date, "MM/DD/YYYY", true).isValid()) {
                console.error(`invalida dateformat ${date}`);
                throw new Error("Invalid date format");
            }
            if (date <= (0, datehandeling_1.formatDateToMMDDYY)(new Date())) {
                throw new Error("Date must be greater than today");
            }
            if (datesSet.has(date)) {
                throw new Error("Dates must be unique");
            }
            datesSet.add(date);
        });
        return true;
    }),
    (0, express_validator_1.body)("capacity")
        .exists({ checkFalsy: true })
        .withMessage("capacity is required")
        .isInt({ gt: 0 })
        .withMessage("capacity must be a positive integer"),
    // Validate photos array
    (0, express_validator_1.body)("photos").custom((_, { req }) => {
        const files = req.files ? req.files.photos : null;
        if (!files || files.length === 0) {
            throw new appError_1.AppError("At least one photo is required.", 400);
        }
        if (!Array.isArray(files)) {
            throw new appError_1.AppError("photos must be an array.", 400);
        }
        // Validate each file's type and size
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "application/pdf",
        ];
        const maxFileSize = 5 * 1024 * 1024; // 5 MB
        files.forEach((file) => {
            if (!allowedTypes.includes(file.mimetype)) {
                throw new appError_1.AppError(`File type ${file.mimetype} is not supported.`, 400);
            }
            if (file.size > maxFileSize) {
                throw new appError_1.AppError(`File ${file.originalname} exceeds the 5MB size limit.`, 400);
            }
        });
        return true;
    }),
];
exports.createVenueValidation = createVenueValidation;
const updateVenueValidation = [
    (0, express_validator_1.body)("name")
        .optional()
        .isLength({ min: 5 })
        .withMessage("name must be at least 5 characters long"),
    (0, express_validator_1.body)("desc").optional(),
    (0, express_validator_1.body)("location")
        .optional()
        .isLength({ min: 5 })
        .withMessage("location must be at least 5 characters long"),
    (0, express_validator_1.body)("price")
        .optional()
        .isFloat({ gt: 0 })
        .withMessage("price must be a positive number"),
    (0, express_validator_1.body)("availability").optional(),
    (0, express_validator_1.body)("capacity")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("capacity must be a positive integer"),
    // Validate photos array
    (0, express_validator_1.body)("photos")
        .custom((_, { req }) => {
        const files = req.files ? req.files.photos : null;
        if (!files || files.length === 0) {
            throw new appError_1.AppError("At least one photo is required.", 400);
        }
        if (!Array.isArray(files)) {
            throw new appError_1.AppError("photos must be an array.", 400);
        }
        // Validate each file's type and size
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "application/pdf",
        ];
        const maxFileSize = 5 * 1024 * 1024; // 5 MB
        files.forEach((file) => {
            if (!allowedTypes.includes(file.mimetype)) {
                throw new appError_1.AppError(`File type ${file.mimetype} is not supported.`, 400);
            }
            if (file.size > maxFileSize) {
                throw new appError_1.AppError(`File ${file.originalname} exceeds the 5MB size limit.`, 400);
            }
        });
        return true;
    })
        .optional(),
];
exports.updateVenueValidation = updateVenueValidation;
const getVenueValidation = (0, express_validator_1.param)("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .isHexadecimal()
    .withMessage(" id must be in hex format");
exports.getVenueValidation = getVenueValidation;
