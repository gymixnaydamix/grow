import { Router } from 'express';

const router = Router();

// Get all facilities
router.get('/', (req, res) => {
  res.json({ message: 'List of facilities' });
});

// Create a new facility
router.post('/', (req, res) => {
  res.json({ message: 'Facility created' });
});

export default router;
