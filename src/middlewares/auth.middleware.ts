import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const auth = request.headers.authorization;

  if(!auth) {
    return response.sendStatus(401);
  }

  const token = auth.split(" ")[1];

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY || "");

    const { id } = data as TokenPayload;

    request.userId = id;

    return next();
  } catch {
    return response.sendStatus(401);
  }
};