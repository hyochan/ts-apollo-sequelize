import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response): void => {
  // @ts-ignore
  res.render('index', { userid: 'dooboolab' });
});

export default router;
