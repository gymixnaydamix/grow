import { Router } from 'express';

const router = Router();

// Get exports
router.get('/', (req, res) => {
  res.json({ message: 'List of exports' });
});

// Create a new export
router.post('/', (req, res) => {
  res.json({ message: 'Export created' });
});

export default router;
