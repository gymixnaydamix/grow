import { Router } from 'express';

const router = Router();

// Get all courses
router.get('/', (req, res) => {
  res.json({ message: 'List of courses' });
});

// Create a new course
router.post('/', (req, res) => {
  res.json({ message: 'Course created' });
});

export default router;
