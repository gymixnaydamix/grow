import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const rows = db.prepare('SELECT key, value FROM settings WHERE school_id = ? AND key LIKE "general_%"').all(req.user.school_id) as {key: string, value: string}[];

  const settings: any = {
    school_name: 'School ERP',
    contact_email: 'admin@school.edu',
    phone_number: '',
    address: '',
    academic_year: '2023-2024'
  };

  rows.forEach(row => {
    const field = row.key.replace('general_', '');
    settings[field] = row.value;
  });

  res.json(settings);
}));

router.post('/', catchAsync(async (req: any, res) => {
  const settings = req.body;

  const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value, school_id) VALUES (?, ?, ?)');

  Object.entries(settings).forEach(([key, value]) => {
    stmt.run(`general_${key}`, String(value), req.user.school_id);
  });

  res.json({ status: 'success' });
}));

export default router;
