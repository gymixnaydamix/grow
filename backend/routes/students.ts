import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/error-handler';

const router = Router();

// Get all students
router.get('/', protect, catchAsync(async (req: any, res) => {
  const students = db.prepare('SELECT * FROM students WHERE school_id = ?').all(req.user.school_id || 'school_1');
  res.json({ status: 'success', data: students });
}));

// Create a new student
router.post('/', protect, restrictTo('admin', 'admissions'), catchAsync(async (req: any, res) => {
  const { name, email, grade } = req.body;
  const id = uuidv4();

  db.prepare('INSERT INTO students (id, name, email, grade, school_id) VALUES (?, ?, ?, ?, ?)')
    .run(id, name, email, grade, req.user.school_id || 'school_1');

  res.status(201).json({ status: 'success', data: { id, name, email, grade } });
}));

export default router;
