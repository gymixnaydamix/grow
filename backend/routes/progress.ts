import { Router } from 'express';

const router = Router();

// Get all progress records
router.get('/', (req, res) => {
  res.json({ message: 'List of progress records' });
});

// Create a new progress record
router.post('/', (req, res) => {
  res.json({ message: 'Progress record created' });
});

export default router;
