import { Router } from 'express';

const router = Router();

// Get all assignments
router.get('/', (req, res) => {
  res.json({ message: 'List of assignments' });
});

// Create a new assignment
router.post('/', (req, res) => {
  res.json({ message: 'Assignment created' });
});

export default router;
