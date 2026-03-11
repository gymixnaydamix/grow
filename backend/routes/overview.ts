import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    activeUsers: 14205,
    revenue: 845000,
    growth: 12.5,
    systemStatus: 'Optimal',
    recentActivity: [
      { id: 1, action: 'System Update', time: '2 mins ago', status: 'success' },
      { id: 2, action: 'Database Backup', time: '1 hour ago', status: 'success' },
      { id: 3, action: 'New User Registration', time: '3 hours ago', status: 'info' },
    ]
  });
});

export default router;
