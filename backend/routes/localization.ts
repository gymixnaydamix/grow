import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const rows = db.prepare('SELECT key, value FROM settings WHERE school_id = ? AND key LIKE "localization_%"').all(req.user.school_id) as {key: string, value: string}[];

  const settings: any = {
    timezone: 'UTC',
    date_format: 'YYYY-MM-DD',
    currency: 'USD',
    language: 'English'
  };

  rows.forEach(row => {
    const field = row.key.replace('localization_', '');
    settings[field] = row.value;
  });

  res.json(settings);
}));

router.post('/', catchAsync(async (req: any, res) => {
  const settings = req.body;
  const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value, school_id) VALUES (?, ?, ?)');

  Object.entries(settings).forEach(([key, value]) => {
    stmt.run(`localization_${key}`, String(value), req.user.school_id);
  });

  res.json({ status: 'success' });
}));

export default router;
