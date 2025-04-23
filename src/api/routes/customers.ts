import express from 'express';
import { customerController } from '../controllers/customer';


const router = express.Router();

// Rotas CRUD básicas
router.post('/', customerController.createCustomer);
router.get('/', customerController.listCustomers);
router.get('/:id', customerController.getCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);


router.get('/analytics', customerController.getCustomerAnalytics);

export default router;