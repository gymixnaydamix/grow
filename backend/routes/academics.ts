import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM audit_logs WHERE school_id = ? AND action = "academic_record"').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

router.post('/', catchAsync(async (req: any, res) => {
  const { student_id, type, details } = req.body;
  const id = uuidv4();
  db.prepare('INSERT INTO audit_logs (id, user_id, action, details, school_id) VALUES (?, ?, ?, ?, ?)')
    .run(id, req.user.id, "academic_record", `Recorded ${type} for student ${student_id}: ${details}`, req.user.school_id);
  res.status(201).json({ status: 'success', data: { id } });
}));

export default router;
