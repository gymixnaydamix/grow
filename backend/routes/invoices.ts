import { Router } from 'express';
import db from '../db';
import { catchAsync } from '../utils/error-handler';
import { protect } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';
import { validate } from '../middleware/validate';
import { invoiceSchema } from '../validations';

const router = Router();

router.use(protect);

// Get all invoices
router.get('/', catchAsync(async (req: any, res) => {
  const invoices = db.prepare('SELECT * FROM invoices WHERE school_id = ? ORDER BY created_at DESC')
    .all(req.user.school_id);

  res.json({
    status: 'success',
    data: invoices
  });
}));

// Create a new invoice
router.post('/', validate(invoiceSchema), catchAsync(async (req: any, res) => {
  const { student_id, amount, status, due_date } = req.body;
  const id = uuidv4();

  db.prepare('INSERT INTO invoices (id, student_id, amount, status, due_date, school_id) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, student_id, amount, status, due_date, req.user.school_id);

  const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);

  res.status(201).json({
    status: 'success',
    data: invoice
  });
}));

export default router;
