import { Router } from 'express';

const router = Router();

// Get all grading records
router.get('/', (req, res) => {
  res.json({ message: 'List of grading records' });
});

// Create a new grading record
router.post('/', (req, res) => {
  res.json({ message: 'Grading record created' });
});

export default router;
