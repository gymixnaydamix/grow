import { Router } from 'express';

const router = Router();

// Get all inventory items
router.get('/', (req, res) => {
  res.json({ message: 'List of inventory items' });
});

// Create a new inventory item
router.post('/', (req, res) => {
  res.json({ message: 'Inventory item created' });
});

export default router;
