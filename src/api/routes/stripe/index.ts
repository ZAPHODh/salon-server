import { Router } from 'express';
import webhookRouter from './webhook';
import checkoutRouter from './checkout';


const router = Router();

router.use('/', webhookRouter);
router.use('/', checkoutRouter);


export default router;