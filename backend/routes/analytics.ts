import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    userEngagement: [
      { day: 'Mon', value: 400 },
      { day: 'Tue', value: 300 },
      { day: 'Wed', value: 550 },
      { day: 'Thu', value: 450 },
      { day: 'Fri', value: 600 },
      { day: 'Sat', value: 800 },
      { day: 'Sun', value: 750 },
    ],
    conversionRate: 4.2,
    bounceRate: 32.5,
    topSources: [
      { source: 'Direct', percentage: 45 },
      { source: 'Organic Search', percentage: 30 },
      { source: 'Social', percentage: 15 },
      { source: 'Referral', percentage: 10 },
    ]
  });
});

export default router;
