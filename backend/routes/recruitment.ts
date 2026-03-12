import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM recruitment WHERE school_id = ?').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

router.post('/', catchAsync(async (req: any, res) => {
  const { job_title, department, description } = req.body;
  const id = uuidv4();
  db.prepare('INSERT INTO recruitment (id, job_title, department, description, school_id) VALUES (?, ?, ?, ?, ?)')
    .run(id, job_title, department, description, req.user.school_id);
  res.status(201).json({ status: 'success', data: { id, job_title } });
}));

export default router;
