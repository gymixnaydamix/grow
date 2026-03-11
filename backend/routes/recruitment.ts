import { Router } from 'express';

const router = Router();

// Get all recruitment records
router.get('/', (req, res) => {
  res.json({ message: 'List of recruitment records' });
});

// Create a new recruitment record
router.post('/', (req, res) => {
  res.json({ message: 'Recruitment record created' });
});

export default router;
