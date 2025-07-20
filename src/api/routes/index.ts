import { Router } from 'express';
import authRouter from './auth';
import salonsRouter from './salons';
import professionalsRouter from './professionals';
import servicesRouter from './services';
import appointmentsRouter from './appointments';
import salesRouter from './sales';
import inventoryRouter from './inventory';
import stripeRouter from './stripe';
import customerRouter from './customers';
import financeRoutes from './financials';
import commissionsRoutes from './commissions'
import expenseCategoriesRoutes from './expenses-categories'
import expensesRoutes from './expenses'
import transactionsRoutes from './transactions'
import paymentMethodsRoutes from './payment-methods'

import { authController } from '../controllers/auth';

const { secure }= authController
const router = Router();

router.use('/auth', authRouter);
router.use(secure)
router.use('/salons', salonsRouter);
router.use('/professionals', professionalsRouter);
router.use('/services', servicesRouter);
router.use('/appointments', appointmentsRouter);
router.use('/inventory', inventoryRouter);
router.use('/stripe', stripeRouter)
router.use('/customers', customerRouter)
router.use("/transactions", transactionsRoutes)
router.use("/sales", salesRouter)
router.use("/expenses", expensesRoutes)
router.use("/commissions", commissionsRoutes)
router.use("/payment-methods", paymentMethodsRoutes)
router.use("/expense-categories", expenseCategoriesRoutes)
router.use("/finance", financeRoutes)

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "financial-api",
  })
})

export default router;