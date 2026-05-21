"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrab = void 0;
const globalHandeling_1 = require("../middlewares/globalHandeling");
const booking_routes_1 = require("./bookings/booking.routes");
const user_routes_1 = require("./user/user.routes");
const venue_routes_1 = require("./venue/venue.routes");
const bootstrab = function (app) {
    app.use(user_routes_1.userRouter);
    app.use(venue_routes_1.venueRouter);
    app.use(booking_routes_1.bookingRouter);
    app.use(globalHandeling_1.globalHandeling);
};
exports.bootstrab = bootstrab;
