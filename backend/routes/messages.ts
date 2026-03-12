import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM messages WHERE school_id = ? AND (sender_id = ? OR receiver_id = ?) ORDER BY created_at DESC').all(req.user.school_id, req.user.id, req.user.id);
  res.json({ status: 'success', data });
}));

export default router;
