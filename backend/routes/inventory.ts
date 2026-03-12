import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM inventory WHERE school_id = ?').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

router.post('/', catchAsync(async (req: any, res) => {
  const { item_name, category, quantity, unit, status } = req.body;
  const id = uuidv4();
  db.prepare('INSERT INTO inventory (id, item_name, category, quantity, unit, status, school_id) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(id, item_name, category, quantity, unit, status, req.user.school_id);
  res.status(201).json({ status: 'success', data: { id, item_name } });
}));

export default router;
