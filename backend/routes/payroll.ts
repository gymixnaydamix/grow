import { Router } from 'express';

const router = Router();

// Get all payroll records
router.get('/', (req, res) => {
  res.json({ message: 'List of payroll records' });
});

// Create a new payroll record
router.post('/', (req, res) => {
  res.json({ message: 'Payroll record created' });
});

export default router;
