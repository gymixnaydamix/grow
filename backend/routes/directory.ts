import { Router } from 'express';

const router = Router();

// Get directory
router.get('/', (req, res) => {
  res.json({ message: 'Directory listing' });
});

// Add to directory
router.post('/', (req, res) => {
  res.json({ message: 'Directory entry created' });
});

export default router;
