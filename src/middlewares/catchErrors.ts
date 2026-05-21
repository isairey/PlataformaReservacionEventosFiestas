import { NextFunction, Request, Response } from "express";

export const catchError = function (fn:Function) {
  return (req:Request, res:Response, next:NextFunction) => {
    fn(req, res, next).catch((err:{}) => {
      // res.json({ message: err.message });
      next(err);
    });
  };
};
