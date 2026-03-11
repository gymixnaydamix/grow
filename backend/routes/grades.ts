import { Router } from 'express';

const router = Router();

// Get all grades
router.get('/', (req, res) => {
  res.json({ message: 'List of grades' });
});

// Create a new grade
router.post('/', (req, res) => {
  res.json({ message: 'Grade created' });
});

export default router;
