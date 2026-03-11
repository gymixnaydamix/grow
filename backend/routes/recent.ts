import { Router } from 'express';

const router = Router();

// Get recent items
router.get('/', (req, res) => {
  res.json({ message: 'List of recent items' });
});

export default router;
