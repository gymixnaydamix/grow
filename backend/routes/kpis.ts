import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM kpis WHERE school_id = ?').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

router.post('/', catchAsync(async (req: any, res) => {
  const { name, value, target, unit } = req.body;
  const id = uuidv4();
  db.prepare('INSERT INTO kpis (id, name, value, target, unit, school_id) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, name, value, target, unit, req.user.school_id);
  res.status(201).json({ status: 'success', data: { id, name } });
}));

export default router;
