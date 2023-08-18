import { Request, Response } from "express";
import AppError from "../errors/appError";

export default function errorHandler(error: Error, req: Request, res: Response) {
  console.error('Error caught by errorHandler:', error);
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: 'error'
    });
  }

  return res.status(500).json({ message: error.message, status: 'error' });
}
