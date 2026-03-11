import { Router } from 'express';

const router = Router();

// Get all attendance records
router.get('/', (req, res) => {
  res.json({ message: 'List of attendance records' });
});

// Create a new attendance record
router.post('/', (req, res) => {
  res.json({ message: 'Attendance record created' });
});

export default router;
