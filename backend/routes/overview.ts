import { Router } from 'express';
import db from '../db';
import { protect } from '../middleware/auth';
import { catchAsync } from '../utils/error-handler';

const router = Router();

router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users WHERE school_id = ?').get(req.user.school_id) as any;
  const invoiceTotal = db.prepare('SELECT SUM(amount) as total FROM invoices WHERE school_id = ? AND status = \'paid\'').get(req.user.school_id) as any;
  const studentCount = db.prepare('SELECT COUNT(*) as count FROM students WHERE school_id = ?').get(req.user.school_id) as any;

  res.json({
    activeUsers: userCount.count,
    revenue: invoiceTotal.total || 0,
    growth: studentCount.count,
    systemStatus: 'Optimal',
    recentActivity: [
      { id: 1, action: 'System Initialized', time: 'Just now', status: 'success' },
      { id: 2, action: 'School Data Loaded', time: 'Recently', status: 'info' },
    ]
  });
}));

export default router;
