import { Router } from 'express';

const router = Router();

// Get all classes
router.get('/', (req, res) => {
  res.json({ message: 'List of classes' });
});

// Create a new class
router.post('/', (req, res) => {
  res.json({ message: 'Class created' });
});

export default router;
