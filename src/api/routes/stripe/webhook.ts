import { Router,raw } from 'express';

import { WebhookController } from '../../controllers/stripe/webhook';

const router = Router();

router.post(
  '/webhook',
  raw({ type: 'application/json' }), 
  WebhookController.handle
);

export default router;