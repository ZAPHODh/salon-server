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
const { secure }= authController
const router = Router();

router.use('/auth', authRouter);
router.use(secure)
router.use('/salons', salonsRouter);
router.use('/professionals', professionalsRouter);
router.use('/services', servicesRouter);
router.use('/appointments', appointmentsRouter);
router.use('/sales', salesRouter);
router.use('/inventory', inventoryRouter);
router.use('/stripe', stripeRouter)
router.use('/customers', customerRouter)

export default router;