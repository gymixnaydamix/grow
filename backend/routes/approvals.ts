import { Router } from 'express';

const router = Router();

// Get all approvals
router.get('/', (req, res) => {
  res.json({ message: 'List of approvals' });
});

// Create a new approval
router.post('/', (req, res) => {
  res.json({ message: 'Approval created' });
});

export default router;
