import { Router } from 'express';
import authRouter from './auth';
import salonsRouter from './salons';
import professionalsRouter from './professionals';
import servicesRouter from './services';
import appointmentsRouter from './appointments';
import salesRouter from './sales';
import inventoryRouter from './inventory';
import stripeRouter from './stripe'
import customerRouter from './customers'
import { authController } from '../controllers/auth';
import commissionRouter from './commission-rules'
const { secure }= authController
const router = Router();

router.use('/auth', authRouter);
router.use('/salons', secure, salonsRouter);
router.use('/professionals', secure, professionalsRouter);
router.use('/services', secure, servicesRouter);
router.use('/appointments', secure, appointmentsRouter);
router.use('/sales', secure, salesRouter);
router.use('/inventory', secure, inventoryRouter);
router.use('/stripe', stripeRouter)
router.use('/customer', customerRouter)
router.use('/commission-rules',secure, commissionRouter)

export default router;