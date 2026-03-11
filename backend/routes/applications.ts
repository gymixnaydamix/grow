import { Router } from 'express';

const router = Router();

// Get all applications
router.get('/', (req, res) => {
  res.json({ message: 'List of applications' });
});

// Create a new application
router.post('/', (req, res) => {
  res.json({ message: 'Application created' });
});

export default router;
