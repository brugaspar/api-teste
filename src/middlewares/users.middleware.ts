import { Request, Response, NextFunction } from "express";

import userSchema from "../schemas/users.schema";

export const userMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const { error } = userSchema.validate(request.body);

  const isValid = error === undefined;

  if(isValid) {
    return next();
  } else {
    const message = "Field " + error?.details.map(i => i.message).join(",").replace(/"/gi, "'");

    return response.json({ error: message }).status(422);
  }
};