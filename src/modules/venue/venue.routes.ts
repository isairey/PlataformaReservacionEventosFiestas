import { Router } from "express";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../user/Roles";
import { verfifyToken } from "../../middlewares/verifiyToken";
import * as vc from "./venue.controller";
import { uploadPhotos } from "../../fileUpload/fileUpload";
import {
  createVenueValidation,
  getVenueValidation,
  updateVenueValidation,
} from "./venue.validator";
import { validateRequest } from "../../middlewares/validate-request";

export const venueRouter = Router();
venueRouter
  .use(verfifyToken)
  .post(
    "/venues",
    uploadPhotos("venues", "photos"),
    allowedTo(Roles.OWNER),
    createVenueValidation,
    validateRequest,
    vc.addVenue
  )
  .get("/venues", vc.getAllVenues)
  .get("/venues/:id", getVenueValidation, validateRequest, vc.getVenue)
  .patch(
    "/venues/:id",
    uploadPhotos("venues", "photos"),
    allowedTo(Roles.OWNER),
    updateVenueValidation,
    validateRequest,
    vc.updateVenue
  )
  .delete(
    "/venues/:id",
    getVenueValidation,
    validateRequest,
    allowedTo(Roles.OWNER, Roles.ADMIN),
    vc.deleteVenue
  );
