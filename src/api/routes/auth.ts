import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { authController } from '../controllers/auth';


const router = Router();

router.post('/login', asyncHandler(authController.signin));
router.post('/signup', asyncHandler(authController.signup));
router.post('/refresh-token', asyncHandler(authController.session));


export default router;