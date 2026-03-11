import { Router } from 'express';

const router = Router();

// Get all schedule records
router.get('/', (req, res) => {
  res.json({ message: 'List of schedule records' });
});

// Create a new schedule record
router.post('/', (req, res) => {
  res.json({ message: 'Schedule record created' });
});

export default router;
