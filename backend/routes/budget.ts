import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  // Use settings table as a KV store for simple budgets
  const rows = db.prepare('SELECT key, value FROM settings WHERE school_id = ? AND key LIKE "budget_%"').all(req.user.school_id) as any[];

  const budgets = rows.map(r => ({
    id: r.key,
    department: r.key.replace('budget_', ''),
    allocated: 100000, // Default allocation
    spent: parseFloat(r.value) || 0,
    fiscalYear: '2023-2024'
  }));

  res.json({ status: 'success', data: budgets });
}));

router.post('/', catchAsync(async (req: any, res) => {
  const { department, spent } = req.body;
  db.prepare('INSERT OR REPLACE INTO settings (key, value, school_id) VALUES (?, ?, ?)')
    .run(`budget_${department}`, String(spent), req.user.school_id);
  res.json({ status: 'success' });
}));

export default router;
