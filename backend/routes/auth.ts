import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { catchAsync, AppError } from '../utils/error-handler';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { loginSchema } from '../validations';

const router = Router();
const SECRET = process.env.JWT_SECRET || 'super-secret-key-unsafe';

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is required for production.');
}

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

router.post('/login', validate(loginSchema), catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
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

router.get('/me', protect, catchAsync(async (req: any, res) => {
  res.json({
    status: 'success',
    data: req.user
  });
}));

router.patch('/me', protect, catchAsync(async (req: any, res) => {
  const { name, email } = req.body;

  db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?')
    .run(name, email, req.user.id);

  res.json({
    status: 'success',
    message: 'Profile updated'
  });
}));

export default router;
