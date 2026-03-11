import { Router } from 'express';

const router = Router();

// Get all reports
router.get('/', (req, res) => {
  res.json({ message: 'List of reports' });
});

// Create a new report
router.post('/', (req, res) => {
  res.json({ message: 'Report created' });
});

export default router;
