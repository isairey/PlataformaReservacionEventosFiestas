import { NextFunction, Response, Request } from "express";
import path from "path";
import fs from "fs";
import { AppError } from "./appError";

const removeOldImage:any = function (image: string|undefined,folder:string):void {

 let filePath = path.resolve()+`/src/uploads/${folder}/${image}`;
    fs.unlinkSync(filePath);
};
export { removeOldImage };
