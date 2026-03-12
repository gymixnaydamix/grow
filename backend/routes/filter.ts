import { Router } from 'express';
import { protect } from '../middleware/auth';
import db from '../db';
import { catchAsync } from '../utils/error-handler';

const router = Router();

router.use(protect);

router.get('/', catchAsync(async (req: any, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json({ status: 'success', data: [] });
  }

  const query = `%${q}%`;
  const schoolId = req.user.school_id;

  // Search across multiple tables
  const students = db.prepare('SELECT id, name as title, "Student" as type FROM students WHERE school_id = ? AND (name LIKE ? OR email LIKE ?)')
    .all(schoolId, query, query);

  const users = db.prepare('SELECT id, name as title, role as type FROM users WHERE school_id = ? AND (name LIKE ? OR email LIKE ?)')
    .all(schoolId, query, query);

  const courses = db.prepare('SELECT id, name as title, "Course" as type FROM courses WHERE school_id = ? AND (name LIKE ? OR code LIKE ?)')
    .all(schoolId, query, query);

  const results = [...students, ...users, ...courses];

  res.json({
    status: 'success',
    data: results
  });
}));

export default router;
