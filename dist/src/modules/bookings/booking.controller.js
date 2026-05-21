"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayMessage = exports.getUserBookings = exports.cancelBooking = exports.bookVenue = void 0;
const catchErrors_1 = require("../../middlewares/catchErrors");
const booking_model_1 = require("./booking.model");
const venue_model_1 = require("../venue/venue.model");
const appError_1 = require("../../utils/appError");
const status_1 = require("./status");
const datehandeling_1 = require("./datehandeling");
const transaction_model_1 = require("../../../Database/transaction.model");
// import {pay} from"../../utils/paymets"
const bookVenue = (0, catchErrors_1.catchError)(async (req, res, next) => {
    // first get the venue and check if it exsist or not
    let venue = await venue_model_1.Venue.findById(req.params.id);
    if (!venue)
        return next(new appError_1.AppError("venue not found", 404));
    // then check the date
    let { date } = req.body;
    let availableDates = venue.availability.map((ele) => (ele = (0, datehandeling_1.formatDateToMMDDYY)(ele)));
    if (!availableDates.includes(date))
        return next(new appError_1.AppError("no such date", 400));
    // set the status depending on the date
    if (new Date(date) > new Date())
        req.body.status = status_1.Status.pending;
    let dateIndex = availableDates.indexOf(date);
    // remove the date from the venue
    if (dateIndex >= 0)
        venue?.availability.splice(dateIndex, 1);
    else
        return next(new appError_1.AppError("date not found", 404));
    await venue?.save();
    // finally book the venue
    req.body.venue = venue?._id;
    req.body.user = req.user?.userId;
    await booking_model_1.Booking.create(req.body);
    next();
    // res.status(201).json({ message: "success", book });
});
exports.bookVenue = bookVenue;
const cancelBooking = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let booking = await booking_model_1.Booking.findById(req.params.id);
    if (!booking)
        return next(new appError_1.AppError("bookin not found", 404));
    else if (booking.user != req.user?.userId)
        return next(new appError_1.AppError("un authorized", 403));
    else if (new Date() == booking.date)
        return next(new appError_1.AppError("you cannot cancel", 400));
    booking.status = status_1.Status.canceld;
    await booking.save();
    res.status(200).json({ message: "canceld successfully" });
});
exports.cancelBooking = cancelBooking;
const getUserBookings = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let bookings = await booking_model_1.Booking.find({ user: req.user?.userId });
    if (!bookings.length)
        return next(new appError_1.AppError("You Did not book any venue Yet", 404));
    bookings.forEach(async (ele) => {
        if ((0, datehandeling_1.formatDateToMMDDYY)(new Date()) == (0, datehandeling_1.formatDateToMMDDYY)(ele.date) &&
            ele.paymentInfo == "paid")
            ele.status = status_1.Status.confirmed;
        else if (ele.status == status_1.Status.confirmed &&
            (0, datehandeling_1.formatDateToMMDDYY)(new Date()) > (0, datehandeling_1.formatDateToMMDDYY)(ele.date))
            await ele.deleteOne({ _id: String(ele._id) });
        else if ((0, datehandeling_1.formatDateToMMDDYY)(new Date()) >= (0, datehandeling_1.formatDateToMMDDYY)(ele.date) &&
            ele.paymentInfo == "unpaid")
            await ele.deleteOne({ _id: String(ele._id) });
        await ele.save();
    });
    res.status(200).json({ message: "success", bookings });
});
exports.getUserBookings = getUserBookings;
const displayMessage = (0, catchErrors_1.catchError)(async (req, res, next) => {
    await booking_model_1.Booking.updateOne({ _id: req.params.id }, { paymentInfo: "paid" });
    await transaction_model_1.Transaction.update({ payment_status: "paid" }, {
        where: {
            email: req.user?.email,
        },
    });
    res.status(200).json({ message: "successful payment" });
});
exports.displayMessage = displayMessage;
