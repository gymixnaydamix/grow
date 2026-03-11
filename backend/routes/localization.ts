import { Router } from 'express';

const router = Router();

// Get localization settings
router.get('/', (req, res) => {
  res.json({ message: 'Localization settings' });
});

// Update localization settings
router.post('/', (req, res) => {
  res.json({ message: 'Localization settings updated' });
});

export default router;
