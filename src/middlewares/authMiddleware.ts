import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

export const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    req.currentUserId = decoded.id;
    next();
  });
};
