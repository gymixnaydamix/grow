import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM applications WHERE school_id = ? ORDER BY created_at DESC').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

router.post('/', catchAsync(async (req: any, res) => {
  const { student_name, parent_name, email, grade_applying_for } = req.body;
  const id = uuidv4();
  db.prepare('INSERT INTO applications (id, student_name, parent_name, email, grade_applying_for, school_id) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, student_name, parent_name, email, grade_applying_for, req.user.school_id);
  res.status(201).json({ status: 'success', data: { id, student_name } });
}));

export default router;
