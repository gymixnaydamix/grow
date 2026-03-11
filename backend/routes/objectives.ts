import { Router } from 'express';

const router = Router();

// Get all objectives
router.get('/', (req, res) => {
  res.json({ message: 'List of objectives' });
});

// Create a new objective
router.post('/', (req, res) => {
  res.json({ message: 'Objective created' });
});

export default router;
