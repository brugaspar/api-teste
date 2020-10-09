import { Request, Response } from "express";

import * as hash from "../helpers/hash";

import * as userRepository from "../repositories/users.repository";

class UserController {
  async store(request: Request, response: Response) {
    try { 
      const userData = request.body as userRepository.UserData;

      const hashedPassword = await hash.make(userData.password);
  
      userData.password = hashedPassword;
  
      const user = await userRepository.store(userData);
  
      return response.json(user).status(201);      
    } catch(err) {
      return response.json({ error: err.message }).status(400);
    }
  }

  async index(request: Request, response: Response) {
    const user = await userRepository.findById(request.userId);

    if(!user) {
      return response.json({ error: "User not found" }).status(404);
    }

    return response.json(user).status(200);
  }
}

export default new UserController;