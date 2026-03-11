import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { catchAsync, AppError } from '../utils/error-handler';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

// Initialize a default admin if not exists
const initAdmin = async () => {
  const admin = db.prepare('SELECT * FROM users WHERE email = ?').get('admin@school.edu');
  if (!admin) {
    const hash = await bcrypt.hash('admin123', 10);
    db.prepare('INSERT INTO users (id, email, password, role, name, school_id) VALUES (?, ?, ?, ?, ?, ?)')
      .run(uuidv4(), 'admin@school.edu', hash, 'admin', 'Super Admin', 'school_1');
  }
};
initAdmin();

router.post('/login', catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({
    status: 'success',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
}));

export default router;
