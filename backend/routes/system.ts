import { Router } from 'express';

const router = Router();

// Get system settings
router.get('/', (req, res) => {
  res.json({ message: 'System settings' });
});

// Update system settings
router.put('/', (req, res) => {
  res.json({ message: 'System settings updated' });
});

export default router;
