import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM certificates WHERE school_id = ?').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

export default router;
