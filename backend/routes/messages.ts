import { Router } from 'express';

const router = Router();

// Get all messages
router.get('/', (req, res) => {
  res.json({ message: 'List of messages' });
});

// Create a new message
router.post('/', (req, res) => {
  res.json({ message: 'Message created' });
});

export default router;
