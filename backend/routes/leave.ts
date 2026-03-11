import { Router } from 'express';

const router = Router();

// Get all leave requests
router.get('/', (req, res) => {
  res.json({ message: 'List of leave requests' });
});

// Create a new leave request
router.post('/', (req, res) => {
  res.json({ message: 'Leave request created' });
});

export default router;
