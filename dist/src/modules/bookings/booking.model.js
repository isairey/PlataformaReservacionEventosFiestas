"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const status_1 = require("./status");
const bookingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    venue: {
        type: mongoose_1.Types.ObjectId,
        ref: "Venue",
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(status_1.Status),
    },
    paymentInfo: {
        type: String,
        default: "unpaid",
    },
});
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
