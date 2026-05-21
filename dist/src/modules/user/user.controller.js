"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = void 0;
const catchErrors_1 = require("../../middlewares/catchErrors");
const user_model_1 = require("./user.model");
const appError_1 = require("../../utils/appError");
const Roles_1 = require("./Roles");
// get all users whose the roles is user and owner
const getAllUsers = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let users = await user_model_1.User.find({
        $or: [{ role: Roles_1.Roles.OWNER }, { role: Roles_1.Roles.USER }],
    });
    if (!users.length)
        return next(new appError_1.AppError("we have no users yet", 404));
    res.status(200).json({ message: "success", users });
});
exports.getAllUsers = getAllUsers;
const getUser = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let user = await user_model_1.User.findById(req.params.id);
    user || next(new appError_1.AppError("user not found", 404));
    !user || res.status(200).json({ message: "success", user });
});
exports.getUser = getUser;
const updateUser = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let user = await user_model_1.User.findById(req.params.id);
    if (user) {
        if (user.role == Roles_1.Roles.ADMIN)
            return next(new appError_1.AppError("not allowed", 405));
        await user_model_1.User.updateOne({ _id: user?._id }, req.body);
        user.password = undefined;
        res.status(200).json({ message: "success", user });
    }
});
exports.updateUser = updateUser;
const deleteUser = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let user = await user_model_1.User.findById(req.params.id);
    if (user?.role == Roles_1.Roles.ADMIN)
        return next(new appError_1.AppError("not allowed", 405));
    await user_model_1.User.deleteOne({ _id: user?._id });
    res.status(200).json({ message: "success", user });
});
exports.deleteUser = deleteUser;
