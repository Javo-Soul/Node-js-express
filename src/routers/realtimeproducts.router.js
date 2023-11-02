import { Router } from 'express';

const router = Router();

router.get('/realtimeproducts', (req, res) => {
  res.render('home', { title: 'realtimeproducts' });
});

export default router;