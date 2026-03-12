import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  // Staff are just users with non-student roles
  const data = db.prepare('SELECT id, name, email, role FROM users WHERE school_id = ? AND role != "student"').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

export default router;
