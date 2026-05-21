"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVenue = exports.updateVenue = exports.getVenue = exports.getAllVenues = exports.addVenue = void 0;
const catchErrors_1 = require("../../middlewares/catchErrors");
const venue_model_1 = require("./venue.model");
const appError_1 = require("../../utils/appError");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Roles_1 = require("../user/Roles");
const apiFeatures_1 = require("../../utils/apiFeatures");
const addVenue = (0, catchErrors_1.catchError)(async (req, res, next) => {
    req.body.user = req.user?.userId;
    if (req.files) {
        let photosArray = req.files["photos"];
        req.body.photos = photosArray?.map((img) => img.filename);
    }
    req.body.owner = req.user?.userId;
    let venue = await venue_model_1.Venue.create(req.body);
    res.status(200).json({ message: "success", venue });
});
exports.addVenue = addVenue;
const getAllVenues = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let apiFeatuers = new apiFeatures_1.ApiFeatures(venue_model_1.Venue.find().populate("owner", "name email -_id"), req.query)
        .select()
        .filter()
        .sort()
        .search();
    let { page, limit } = apiFeatuers;
    let venues = await apiFeatuers.mongooseQuery;
    res.status(200).json({ message: "success", page, limit, venues });
});
exports.getAllVenues = getAllVenues;
const getVenue = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let venue = await venue_model_1.Venue.findById(req.params.id);
    venue || next(new appError_1.AppError("venue not found", 404));
    !venue || res.status(200).json({ message: "success", venue });
});
exports.getVenue = getVenue;
const updateVenue = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let venue = await venue_model_1.Venue.findById(req.params.id);
    if (!venue)
        return next(new appError_1.AppError("venue not found", 404));
    if (venue.owner != req.user?.userId)
        return next(new appError_1.AppError("not authorized", 403));
    // if the owner provide a photes in Update endpoint
    if (req.files) {
        const oldPhotos = venue?.photos;
        // loop through the old images and remove it from its folder
        if (oldPhotos.length) {
            oldPhotos.forEach((photo) => {
                const photoPath = path_1.default.resolve() + "/src/uploads/venues/" + photo;
                if (fs_1.default.existsSync(photoPath)) {
                    fs_1.default.unlink(photoPath, (err) => {
                        if (err)
                            console.log(err);
                    }); // Deletes the file
                    let photosArray = req.files["photos"];
                    req.body.photos = photosArray?.map((img) => img.filename);
                }
            });
        }
    }
    await venue_model_1.Venue.updateOne({ _id: venue._id }, req.body);
    res.status(200).json({ message: "success" });
});
exports.updateVenue = updateVenue;
const deleteVenue = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let venue = await venue_model_1.Venue.findById(req.params.id);
    if (!venue)
        return next(new appError_1.AppError("venue not found", 404));
    // if this user is not an admin then he is an owner based on my authorization middleware
    if (req.user?.role !== Roles_1.Roles.ADMIN) {
        if (venue.owner != req.user?.userId)
            return next(new appError_1.AppError("un authorized", 403));
    }
    await venue_model_1.Venue.deleteOne({ _id: venue._id });
    // remove the old images
    const oldPhotos = venue?.photos;
    oldPhotos.forEach((photo) => {
        const photoPath = path_1.default.resolve() + "/src/uploads/venues/" + photo;
        if (fs_1.default.existsSync(photoPath)) {
            fs_1.default.unlinkSync(photoPath); // Deletes the file
        }
    });
    res.status(200).json({ message: "deleted successfully", venue });
});
exports.deleteVenue = deleteVenue;
