"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.venueRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const Roles_1 = require("../user/Roles");
const verifiyToken_1 = require("../../middlewares/verifiyToken");
const vc = __importStar(require("./venue.controller"));
const fileUpload_1 = require("../../fileUpload/fileUpload");
const venue_validator_1 = require("./venue.validator");
const validate_request_1 = require("../../middlewares/validate-request");
exports.venueRouter = (0, express_1.Router)();
exports.venueRouter
    .use(verifiyToken_1.verfifyToken)
    .post("/venues", (0, fileUpload_1.uploadPhotos)("venues", "photos"), (0, auth_1.allowedTo)(Roles_1.Roles.OWNER), venue_validator_1.createVenueValidation, validate_request_1.validateRequest, vc.addVenue)
    .get("/venues", vc.getAllVenues)
    .get("/venues/:id", venue_validator_1.getVenueValidation, validate_request_1.validateRequest, vc.getVenue)
    .patch("/venues/:id", (0, fileUpload_1.uploadPhotos)("venues", "photos"), (0, auth_1.allowedTo)(Roles_1.Roles.OWNER), venue_validator_1.updateVenueValidation, validate_request_1.validateRequest, vc.updateVenue)
    .delete("/venues/:id", venue_validator_1.getVenueValidation, validate_request_1.validateRequest, (0, auth_1.allowedTo)(Roles_1.Roles.OWNER, Roles_1.Roles.ADMIN), vc.deleteVenue);
