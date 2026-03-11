import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', (req, res) => {
  res.json({ message: 'List of users' });
});

// Create a new user
router.post('/', (req, res) => {
  res.json({ message: 'User created' });
});

export default router;
