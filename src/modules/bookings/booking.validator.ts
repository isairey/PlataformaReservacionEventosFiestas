import { body, param } from "express-validator";

const bookVenueValidator = [
  body("date")
    .exists({ checkFalsy: true })
    .withMessage("date is required")
    .isString(),
];
const cancelBookingValidator = [
  param("id")
    .exists()
    .withMessage("id is required")
    .isHexadecimal()
    .withMessage("id must be in hex format"),
];
export{bookVenueValidator,cancelBookingValidator}