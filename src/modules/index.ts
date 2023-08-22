import { Router } from 'express';

const router: Router = Router();

router.use(`/invoices`, (_req, res, _next) => res.send({ test: 'test' }));

export default router;
