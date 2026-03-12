import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM audit_logs WHERE school_id = ? AND action = "approval"').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

router.post('/', catchAsync(async (req: any, res) => {
  const { type, target_id, decision } = req.body;
  const id = uuidv4();
  db.prepare('INSERT INTO audit_logs (id, user_id, action, details, school_id) VALUES (?, ?, ?, ?, ?)')
    .run(id, req.user.id, "approval", `${decision} for ${type} (ID: ${target_id})`, req.user.school_id);
  res.status(201).json({ status: 'success', data: { id } });
}));

export default router;
