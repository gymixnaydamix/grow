import { Router } from 'express';

const router = Router();

// Get all announcements
router.get('/', (req, res) => {
  res.json({ message: 'List of announcements' });
});

// Create a new announcement
router.post('/', (req, res) => {
  res.json({ message: 'Announcement created' });
});

export default router;
