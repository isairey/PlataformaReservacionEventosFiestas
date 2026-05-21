import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { User } from "../modules/user/user.model";


declare global {
  // extending the Request type globaly
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        name: string;
        email: string;
        displayName:string
        iat:number;
        role:string
      };
      
    }
  }
}
export const verfifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any | string = req.headers?.token;
  jwt.verify(token, process.env.JWT_KEY as string, async (err: any, decoded: any) => {
    if (err) return next(new AppError("inavlid token", 401));
    let user = await User.findById(decoded.userId);
    // console.log(user);
    if (!user) return next(new AppError("user not found", 404));

    req.user = decoded;

    next();
  });
};
