import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import * as hash from "../helpers/hash";

import * as userRepository from "../repositories/users.repository";

class AuthController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await userRepository.findByEmail(email) as userRepository.UserData;
    
    if(!user) {
      return response.json({ error: "Invalid e-mail" }).status(422);
    }
    
    const isValidPassword = await hash.compare(password, user.password);

    if(!isValidPassword) {
      return response.json({ error: "Invalid password" }).status(422);
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || "", { expiresIn: "1d" });

    return response.json({ user: { id: user._id, email: user.email }, token }).status(200);
  }
}

export default new AuthController;