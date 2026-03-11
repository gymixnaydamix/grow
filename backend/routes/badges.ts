import { Router } from 'express';

const router = Router();

// Get all badges
router.get('/', (req, res) => {
  res.json({ message: 'List of badges' });
});

// Create a new badge
router.post('/', (req, res) => {
  res.json({ message: 'Badge created' });
});

export default router;
