import { Router } from 'express';

const router = Router();

// Get all certificates
router.get('/', (req, res) => {
  res.json({ message: 'List of certificates' });
});

// Create a new certificate
router.post('/', (req, res) => {
  res.json({ message: 'Certificate created' });
});

export default router;
