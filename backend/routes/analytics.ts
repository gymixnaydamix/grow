import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const schoolId = req.user.school_id;

  const attendance = db.prepare('SELECT status, COUNT(*) as count FROM attendance WHERE school_id = ? GROUP BY status').all(schoolId);
  const grades = db.prepare('SELECT grade, COUNT(*) as count FROM grades WHERE school_id = ? GROUP BY grade').all(schoolId);
  const revenue = db.prepare('SELECT SUM(amount) as total, status FROM invoices WHERE school_id = ? GROUP BY status').all(schoolId);

  res.json({
    status: 'success',
    data: {
      attendance,
      grades,
      revenue
    }
  });
}));

export default router;
