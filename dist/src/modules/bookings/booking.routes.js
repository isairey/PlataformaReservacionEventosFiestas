"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_1 = require("../../middlewares/auth");
const Roles_1 = require("../user/Roles");
const paymets_1 = require("../../utils/paymets");
const verifiyToken_1 = require("../../middlewares/verifiyToken");
const booking_validator_1 = require("./booking.validator");
const validate_request_1 = require("../../middlewares/validate-request");
exports.bookingRouter = (0, express_1.Router)();
exports.bookingRouter
    .get("/success-payment/:id", booking_controller_1.displayMessage)
    .use(verifiyToken_1.verfifyToken)
    .post("/book-venue/:id", (0, auth_1.allowedTo)(Roles_1.Roles.USER), booking_validator_1.bookVenueValidator, validate_request_1.validateRequest, booking_controller_1.bookVenue, paymets_1.createCheckOutSessions)
    .patch("/cancel-booking/:id", (0, auth_1.allowedTo)(Roles_1.Roles.USER), booking_validator_1.cancelBookingValidator, validate_request_1.validateRequest, booking_controller_1.cancelBooking)
    .get("/get-user-bookings", (0, auth_1.allowedTo)(Roles_1.Roles.USER), booking_controller_1.getUserBookings);
