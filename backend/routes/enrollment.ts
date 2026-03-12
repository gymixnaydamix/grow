import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
router.use(protect);

router.post('/', catchAsync(async (req: any, res) => {
  const { student_id, grade, email, name } = req.body;

  // Create student from application/enrollment data
  const id = uuidv4();
  db.prepare('INSERT INTO students (id, name, email, grade, school_id) VALUES (?, ?, ?, ?, ?)')
    .run(id, name, email, grade, req.user.school_id);

  res.status(201).json({ status: 'success', data: { id, name } });
}));

export default router;
