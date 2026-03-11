import { Router } from 'express';

const router = Router();

// Get all inquiries
router.get('/', (req, res) => {
  res.json({ message: 'List of inquiries' });
});

// Create a new inquiry
router.post('/', (req, res) => {
  res.json({ message: 'Inquiry created' });
});

export default router;
