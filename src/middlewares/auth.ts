import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { catchError } from "./catchErrors";
import { AppError } from "../utils/appError";
import dotEnv from "dotenv"
// user signing up
const signUp = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return next(new AppError("email already exist please login", 403));
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      user=  await User.create(req.body);
      let token = jwt.sign(
        {
          userId: user!._id,
          name: user!.name,
          email: user!.email,
          role: user!.role,
        },
        process.env.JWT_KEY as string
      );
      return res.status(201).json({ message: "success", token });
    }
  
);
const login = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ email: req.body.email });

    if (!user || !bcrypt.compare(req.body.password, user.password!))
      return next(new AppError("incorrect email or password", 403));
    // sign a token
    let token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email,role:user.role },
      process.env.JWT_KEY as string
    );
    return res
      .status(201)
      .json({ message: `welcome back ${user.name}`, token });
  }
);
const allowedTo=function(...roles:string[]){

  return catchError(async(req:Request,res:Response,next:NextFunction)=>{
    if(!roles.includes(req.user!.role))
     return next(new AppError('you are not authorized',401))
   next()
     
   })
 } 

 export{
  signUp,
  login,
  allowedTo
 }