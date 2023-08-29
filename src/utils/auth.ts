import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const SECRET_KEY = process.env.SECRET_KEY || 'secret';
const SALT_ROUNDS = 10;

export const generateToken = (payload: any) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
