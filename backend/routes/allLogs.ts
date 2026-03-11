import { Router } from 'express';

const router = Router();

// Get all logs
router.get('/', (req, res) => {
  res.json({ message: 'List of all logs' });
});

// Create a new log entry
router.post('/', (req, res) => {
  res.json({ message: 'Log entry created' });
});

export default router;
