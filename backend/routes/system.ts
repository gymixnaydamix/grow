import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';

const router = Router();
router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const data = db.prepare('SELECT * FROM settings WHERE school_id = ?').all(req.user.school_id);
  res.json({ status: 'success', data });
}));

router.post('/', catchAsync(async (req: any, res) => {
  const { settings } = req.body; // Expect an array of {key, value}

  const insert = db.prepare('INSERT OR REPLACE INTO settings (key, value, school_id) VALUES (?, ?, ?)');

  const transaction = db.transaction((items) => {
    for (const item of items) insert.run(item.key, item.value, req.user.school_id);
  });

  transaction(settings);

  res.json({ status: 'success' });
}));

export default router;
