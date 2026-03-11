import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { catchAsync } from '../utils/error-handler';

const router = Router();

// Get all users for the current school
router.get('/', protect, restrictTo('admin'), catchAsync(async (req: any, res) => {
  const users = db.prepare('SELECT id, email, role, name, created_at FROM users WHERE school_id = ?').all(req.user.school_id || 'school_1');
  res.json({ status: 'success', data: users });
}));

// Create a new user
router.post('/', protect, restrictTo('admin'), catchAsync(async (req: any, res) => {
  const { email, password, role, name } = req.body;
  const id = uuidv4();

  const hashedPassword = await bcrypt.hash(password || 'default123', 10);

  db.prepare('INSERT INTO users (id, email, password, role, name, school_id) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, email, hashedPassword, role, name, req.user.school_id || 'school_1');

  res.status(201).json({ status: 'success', data: { id, email, role, name } });
}));

export default router;
