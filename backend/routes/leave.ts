import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM leave_requests WHERE school_id = ?').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

router.post('/', catchAsync(async (req: any, res) => {
  const { type, start_date, end_date, reason } = req.body;
  const id = uuidv4();
  db.prepare('INSERT INTO leave_requests (id, user_id, type, start_date, end_date, reason, school_id) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(id, req.user.id, type, start_date, end_date, reason, req.user.school_id);
  res.status(201).json({ status: 'success', data: { id, type } });
}));

export default router;
