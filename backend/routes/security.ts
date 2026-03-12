import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const rows = db.prepare('SELECT key, value FROM settings WHERE school_id = ? AND key LIKE "security_%"').all(req.user.school_id) as {key: string, value: string}[];

  const settings: any = {
    two_factor_enabled: false,
    password_expiry_days: 90,
    session_timeout_minutes: 30
  };

  rows.forEach(row => {
    const field = row.key.replace('security_', '');
    let value: any = row.value;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    if (!isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') value = Number(value);
    settings[field] = value;
  });

  res.json(settings);
}));

router.post('/', catchAsync(async (req: any, res) => {
  const settings = req.body;
  const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value, school_id) VALUES (?, ?, ?)');

  Object.entries(settings).forEach(([key, value]) => {
    stmt.run(`security_${key}`, String(value), req.user.school_id);
  });

  res.json({ status: 'success' });
}));

export default router;
