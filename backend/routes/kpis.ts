import { Router } from 'express';

const router = Router();

// Get all KPIs
router.get('/', (req, res) => {
  res.json({ message: 'List of KPIs' });
});

// Create a new KPI
router.post('/', (req, res) => {
  res.json({ message: 'KPI created' });
});

export default router;
