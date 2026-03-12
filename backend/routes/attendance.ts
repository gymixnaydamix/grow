import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.use(protect);

// Get all attendance records
router.get('/', catchAsync(async (req: any, res) => {
  const attendance = db.prepare('SELECT a.*, s.name as student_name FROM attendance a JOIN students s ON a.student_id = s.id WHERE a.school_id = ? ORDER BY a.date DESC')
    .all(req.user.school_id);

  res.json({
    status: 'success',
    data: attendance
  });
}));

// Create a new attendance record
router.post('/', catchAsync(async (req: any, res) => {
  const { student_id, date, status } = req.body;
  const id = uuidv4();

  db.prepare('INSERT INTO attendance (id, student_id, date, status, school_id) VALUES (?, ?, ?, ?, ?)')
    .run(id, student_id, date, status, req.user.school_id);

  const record = db.prepare('SELECT * FROM attendance WHERE id = ?').get(id);

  res.status(201).json({
    status: 'success',
    data: record
  });
}));

export default router;
