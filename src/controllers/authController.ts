import { Request, Response } from "express";
import AuthUseCase from "../useCases/authUseCase";

const authUseCase = new AuthUseCase();

export default class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const auth = await authUseCase.login({ email, password });
    return res.status(200).json(auth);
  }

  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const auth = await authUseCase.register({ username, email, password });
    return res.status(201).json(auth);
  }

  async currentUser(req: any, res: Response) {
    const currentUserId = req.currentUserId;
    const currentUser = await authUseCase.currentUser(currentUserId);
    return res.status(200).json(currentUser);
  }
}