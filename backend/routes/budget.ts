import { Router } from 'express';

const router = Router();

// Get all budgets
router.get('/', (req, res) => {
  res.json({ message: 'List of budgets' });
});

// Create a new budget
router.post('/', (req, res) => {
  res.json({ message: 'Budget created' });
});

export default router;
