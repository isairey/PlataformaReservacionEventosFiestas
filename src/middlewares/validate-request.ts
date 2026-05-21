import express from "express";
import {validationResult} from "express-validator"
const validateRequest = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ erros: errors.array() });
    } else next();
  };
  export {validateRequest}