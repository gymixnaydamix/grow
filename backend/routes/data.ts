import { Router } from 'express';

const router = Router();

// Get data settings
router.get('/', (req, res) => {
  res.json({ message: 'Data settings' });
});

// Update data settings
router.post('/', (req, res) => {
  res.json({ message: 'Data settings updated' });
});

export default router;
