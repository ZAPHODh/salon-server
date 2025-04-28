import express from 'express';
import { customerController } from '../controllers/customer';
import { validateBodyMiddleware } from '../middlewares/validate-body';
import { createCustomerSchema, createManyCustomersSchema } from '../../schemas/customer';


const router = express.Router();

router.post('/', validateBodyMiddleware(createCustomerSchema), customerController.createCustomer);
router.post('/many', validateBodyMiddleware(createManyCustomersSchema), customerController.createManyCustomers);
router.get('/', customerController.listCustomers);
router.get('/:id', customerController.getCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', validateBodyMiddleware(createCustomerSchema), customerController.deleteCustomer);


router.get('/analytics', customerController.getCustomerAnalytics);

export default router;