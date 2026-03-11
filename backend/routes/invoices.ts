import { Router } from 'express';

const router = Router();

// Get all invoices
router.get('/', (req, res) => {
  res.json({ message: 'List of invoices' });
});

// Create a new invoice
router.post('/', (req, res) => {
  res.json({ message: 'Invoice created' });
});

export default router;
