import { Router } from "express";
import * as ua from "../../middlewares/auth";
import * as uc from "../user/user.controller";
import { Roles } from "./Roles";
import { verfifyToken } from "../../middlewares/verifiyToken";
import { validateRequest } from "../../middlewares/validate-request";

import {
  SignupValidator,
  deleteUserValidator,
  loginValidator,
  updateUserValidator,
} from "./user.validator";

export const userRouter = Router();
userRouter
  .post("/auth/signup", SignupValidator, validateRequest, ua.signUp)
  .post("/auth/login", loginValidator, validateRequest, ua.login)
  .use(verfifyToken)
  .patch(
    "/users/:id",
    updateUserValidator,
    validateRequest,
    ua.allowedTo(Roles.ADMIN),
    uc.updateUser
  )
  .delete(
    "/users/:id",
    deleteUserValidator,
    validateRequest,
    ua.allowedTo(Roles.ADMIN),
    uc.deleteUser
  )
  .get("/users", uc.getAllUsers)
  .get("/users/:id", updateUserValidator, validateRequest, uc.getUser);
