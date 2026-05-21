import { Router } from "express";
import {
  bookVenue,
  cancelBooking,
  displayMessage,
  getUserBookings,
} from "./booking.controller";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../user/Roles";
import { createCheckOutSessions } from "../../utils/paymets";
import { verfifyToken } from "../../middlewares/verifiyToken";
import {
  bookVenueValidator,
  cancelBookingValidator,
} from "./booking.validator";
import { validateRequest } from "../../middlewares/validate-request";

export const bookingRouter = Router();
bookingRouter
  .get("/success-payment/:id", displayMessage)

  .use(verfifyToken)
  .post(
    "/book-venue/:id",
    allowedTo(Roles.USER),
    bookVenueValidator,
    validateRequest,
    bookVenue,
    createCheckOutSessions
  )
  .patch(
    "/cancel-booking/:id",
    allowedTo(Roles.USER),
    cancelBookingValidator,
    validateRequest,
    cancelBooking
  )
  .get("/get-user-bookings", allowedTo(Roles.USER), getUserBookings);
