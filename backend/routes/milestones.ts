import { Router } from 'express';

const router = Router();

// Get all milestones
router.get('/', (req, res) => {
  res.json({ message: 'List of milestones' });
});

// Create a new milestone
router.post('/', (req, res) => {
  res.json({ message: 'Milestone created' });
});

export default router;
