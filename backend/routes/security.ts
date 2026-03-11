import { Router } from 'express';

const router = Router();

// Get security settings
router.get('/', (req, res) => {
  res.json({ message: 'Security settings' });
});

// Update security settings
router.post('/', (req, res) => {
  res.json({ message: 'Security settings updated' });
});

export default router;
