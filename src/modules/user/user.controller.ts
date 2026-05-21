import { NextFunction, Request, Response } from "express";
import { catchError } from "../../middlewares/catchErrors";
import { User } from "./user.model";
import { AppError } from "../../utils/appError";
import { Roles } from "./Roles";
import { IUser } from "./userINTF";

// get all users whose the roles is user and owner
const getAllUsers = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let users: IUser[] | [] = await User.find({
      $or: [{ role: Roles.OWNER }, { role: Roles.USER }],
    });
    if (!users.length) return next(new AppError("we have no users yet", 404));

    res.status(200).json({ message: "success", users });
  }
);
const getUser = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let user: IUser | null = await User.findById(req.params.id);
    user || next(new AppError("user not found", 404));
    !user || res.status(200).json({ message: "success", user });
  }
);
const updateUser = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let user: IUser | null = await User.findById(req.params.id);
    if (user) {
      if (user.role == Roles.ADMIN)
        return next(new AppError("not allowed", 405));

      await User.updateOne({ _id: user?._id }, req.body);
      user.password = undefined;
      res.status(200).json({ message: "success", user });
    }
  }
);
const deleteUser = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let user: IUser | null = await User.findById(req.params.id);
    if (user?.role == Roles.ADMIN)
      return next(new AppError("not allowed", 405));
    await User.deleteOne({ _id: user?._id });
    res.status(200).json({ message: "success", user });
  }
);
export { getAllUsers, getUser, updateUser, deleteUser };
