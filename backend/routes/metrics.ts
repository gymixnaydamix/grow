import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    cpuUsage: 45,
    memoryUsage: 62,
    networkTraffic: 850,
    latency: 24,
    uptime: '99.99%',
    errorRate: 0.01
  });
});

export default router;
