import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { catchAsync } from '../utils/error-handler';
import { v4 as uuidv4 as uuid } from 'uuid';

const router = Router();

// Get all users for the current school
router.get('/', protect, restrictTo('admin'), catchAsync(async (req: any, res) => {
  const users = db.prepare('SELECT id, email, role, name, created_at FROM users WHERE school_id = ?').all(req.user.school_id);
  res.json({ status: 'success', data: users });
}));

// Create a new user
router.post('/', protect, restrictTo('admin'), catchAsync(async (req: any, res) => {
  const { email, password, role, name } = req.body;
  const id = uuidv4();

  const hashedPassword = await bcrypt.hash(password || 'default123', 10);

  db.prepare('INSERT INTO users (id, email, password, role, name, school_id) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, email, hashedPassword, role, name, req.user.school_id);

  // Log audit trail
  db.prepare('INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, school_id) VALUES (?, ?, ?, ?, ?, ?)')
    .run(uuidv4(), req.user.id, 'CREATE', 'USER', id, req.user.school_id);

  res.status(201).json({ status: 'success', data: { id, email, role, name } });
}));

export default router;
