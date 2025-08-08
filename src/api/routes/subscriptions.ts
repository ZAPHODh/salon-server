import { Router } from 'express';
import { subscriptionsController } from '../controllers/subscriptions';

const router = Router();

router.get('/:id', subscriptionsController.getSubscription);
router.post('/async-succeeded/:id', subscriptionsController.updateSubscriptionAsync);
router.post('/succeeded/:id', subscriptionsController.updateSubscription);

export default router;