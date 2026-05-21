"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venue = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const venueSchema = new mongoose_2.Schema({
    name: {
        type: String,
        // required: true,
        minLength: [3, "name too short"],
    },
    location: {
        type: String,
        minLength: [3, "name too short"],
    },
    status: {},
    desc: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    availability: {
        type: [Date],
    },
    capacity: {
        type: Number,
    },
    photos: {
        type: [String],
    },
    owner: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
}, { versionKey: false });
venueSchema.post("find", (doc) => {
    let url = process.env.BASE_URL + "uploads/venues/";
    doc.photos = doc.photos?.map((image) => url + image);
});
exports.Venue = (0, mongoose_2.model)("Venue", venueSchema);
