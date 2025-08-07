import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { subscriptionsController } from '../controllers/subscriptions';

const router = Router();

router.get('/:id', asyncHandler(subscriptionsController.getSubscription));
router.post('async-succeeded/:id', asyncHandler(subscriptionsController.updateSubscriptionAsync));
router.post('succeeded/:id', asyncHandler(subscriptionsController.updateSubscription));

export default router;