import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { inventoryController } from '../controllers/inventory';


const router = Router();

router.post('/movements', asyncHandler(inventoryController.createMovement));
router.get('/products/:productId/stock', asyncHandler(inventoryController.getProductStock));

export default router;