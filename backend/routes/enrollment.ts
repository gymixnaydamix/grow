import { Router } from 'express';

const router = Router();

// Get all enrollment records
router.get('/', (req, res) => {
  res.json({ message: 'List of enrollment records' });
});

// Create a new enrollment record
router.post('/', (req, res) => {
  res.json({ message: 'Enrollment record created' });
});

export default router;
