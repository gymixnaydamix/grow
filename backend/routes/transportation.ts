import { Router } from 'express';

const router = Router();

// Get all transportation routes/vehicles
router.get('/', (req, res) => {
  res.json({ message: 'List of transportation routes' });
});

// Create a new transportation route/vehicle
router.post('/', (req, res) => {
  res.json({ message: 'Transportation route created' });
});

export default router;
