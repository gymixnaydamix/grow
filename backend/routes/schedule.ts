import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM schedule WHERE school_id = ?').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

router.post('/', catchAsync(async (req: any, res) => {
  // Logic to add a schedule item (using classes table)
  const { course_id, room, schedule } = req.body;
  const id = uuidv4();
  db.prepare('INSERT INTO classes (id, course_id, room, schedule, school_id) VALUES (?, ?, ?, ?, ?)')
    .run(id, course_id, room, schedule, req.user.school_id);
  res.status(201).json({ status: 'success', data: { id } });
}));

export default router;
