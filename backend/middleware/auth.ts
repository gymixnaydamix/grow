import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError, catchAsync } from '../utils/error-handler';
import db from '../db';

const SECRET = process.env.JWT_SECRET || 'super-secret-key-unsafe';

export const protect = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  try {
    const decoded: any = jwt.verify(token, SECRET);

    // Fetch full user to ensure they still exist and get their school_id
    const user = db.prepare('SELECT id, email, role, school_id FROM users WHERE id = ?').get(decoded.id);
    if (!user) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new AppError('Invalid token. Please log in again.', 401));
  }
});

export const restrictTo = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
