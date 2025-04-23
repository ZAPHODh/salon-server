import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { saleController } from '../controllers/sale';


const router = Router();

router.post('/', asyncHandler(saleController.createSale));
router.get('/', asyncHandler(saleController.listSales));
router.get('/:id', asyncHandler(saleController.getSale));

export default router;