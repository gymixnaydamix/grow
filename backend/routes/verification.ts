import { Router } from 'express';

const router = Router();

// Get all verification records
router.get('/', (req, res) => {
  res.json({ message: 'List of verification records' });
});

// Create a new verification record
router.post('/', (req, res) => {
  res.json({ message: 'Verification record created' });
});

export default router;
