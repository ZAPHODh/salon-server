import { Router } from 'express';
import { CheckoutController } from '../../controllers/stripe/checkout';
import { authController } from '../../controllers/auth';


const router = Router();

router.post('/checkout', authController.secure, CheckoutController.create);
router.post('/verify', authController.secure, CheckoutController.verify);

export default router;