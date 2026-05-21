import { body, param } from "express-validator";
import { AppError } from "../../utils/appError";
import moment from "moment";
import { formatDateToMMDDYY } from "../bookings/datehandeling";

const createVenueValidation = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name is required")
    .isLength({ min: 5 })
    .withMessage("name must be at least 5 characters long"),

  body("desc").exists({ checkFalsy: true }).withMessage("desc is required"),

  body("location")
    .exists({ checkFalsy: true })
    .withMessage("location is required")
    .isLength({ min: 5 })
    .withMessage("location must be at least 5 characters long"),

  body("price")
    .exists({ checkFalsy: true })
    .withMessage("price is required")
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),

  body("availability")
    .exists({ checkFalsy: true })
    .withMessage("availability is required ")
    .custom((value, { req }) => {
      if (!Array.isArray(value)) {
        throw new Error("Availability must be an array of dates");
      }

      const today = moment().startOf("day");
      const datesSet = new Set();

      value.forEach((date) => {
        if (!moment(date, "MM/DD/YYYY", true).isValid()) {
          console.error(`invalida dateformat ${date}`);
          throw new Error("Invalid date format");
        }
        if (date<= formatDateToMMDDYY(new Date())) {
          throw new Error("Date must be greater than today");
        }

        if (datesSet.has(date)) {
          throw new Error("Dates must be unique");
        }
        datesSet.add(date);
      });

      return true;
    })
   ,

  body("capacity")
    .exists({ checkFalsy: true })
    .withMessage("capacity is required")
    .isInt({ gt: 0 })
    .withMessage("capacity must be a positive integer"),

  // Validate photos array
  body("photos").custom((_, { req }) => {
    const files = req.files ? req.files.photos : null;

    if (!files || files.length === 0) {
      throw new AppError("At least one photo is required.", 400);
    }

    if (!Array.isArray(files)) {
      throw new AppError("photos must be an array.", 400);
    }

    // Validate each file's type and size
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    files.forEach((file: any) => {
      if (!allowedTypes.includes(file.mimetype)) {
        throw new AppError(`File type ${file.mimetype} is not supported.`, 400);
      }

      if (file.size > maxFileSize) {
        throw new AppError(
          `File ${file.originalname} exceeds the 5MB size limit.`,
          400
        );
      }
    });

    return true;
  }),
];
const updateVenueValidation = [
  body("name")
    .optional()
    .isLength({ min: 5 })
    .withMessage("name must be at least 5 characters long"),
  body("desc").optional(),

  body("location")
    .optional()
    .isLength({ min: 5 })
    .withMessage("location must be at least 5 characters long"),

  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),

  body("availability").optional(),
  body("capacity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("capacity must be a positive integer"),

  // Validate photos array
  body("photos")
    .custom((_, { req }) => {
      const files = req.files ? req.files.photos : null;

      if (!files || files.length === 0) {
        throw new AppError("At least one photo is required.", 400);
      }

      if (!Array.isArray(files)) {
        throw new AppError("photos must be an array.", 400);
      }

      // Validate each file's type and size
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
      ];
      const maxFileSize = 5 * 1024 * 1024; // 5 MB

      files.forEach((file: any) => {
        if (!allowedTypes.includes(file.mimetype)) {
          throw new AppError(
            `File type ${file.mimetype} is not supported.`,
            400
          );
        }

        if (file.size > maxFileSize) {
          throw new AppError(
            `File ${file.originalname} exceeds the 5MB size limit.`,
            400
          );
        }
      });

      return true;
    })
    .optional(),
];
const getVenueValidation = param("id")
  .exists({ checkFalsy: true })
  .withMessage("id is required")
  .isHexadecimal()
  .withMessage(" id must be in hex format");

export { createVenueValidation, getVenueValidation, updateVenueValidation };
