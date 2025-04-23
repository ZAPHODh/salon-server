import { Router } from 'express';

import { PlansController } from '../../controllers/stripe/plans';


const router = Router();

router.get('/prices', PlansController.listPrices);

export default router;