import { Router } from 'express';

const router = Router();

// Get all documents
router.get('/', (req, res) => {
  res.json({ message: 'List of documents' });
});

// Create a new document
router.post('/', (req, res) => {
  res.json({ message: 'Document created' });
});

export default router;
