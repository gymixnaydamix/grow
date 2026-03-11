import { Router } from 'express';

const router = Router();

// Get general settings
router.get('/', (req, res) => {
  res.json({ message: 'General settings' });
});

// Update general settings
router.post('/', (req, res) => {
  res.json({ message: 'General settings updated' });
});

export default router;
