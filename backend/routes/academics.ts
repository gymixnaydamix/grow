import { Router } from 'express';

const router = Router();

// Get all academics records
router.get('/', (req, res) => {
  res.json({ message: 'List of academics records' });
});

// Create a new academics record
router.post('/', (req, res) => {
  res.json({ message: 'Academics record created' });
});

export default router;
