import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { serviceController } from '../controllers/services';

const router = Router();

router.post('/', asyncHandler(serviceController.createService));
router.get('/', asyncHandler(serviceController.listServices));
router.get('/:id', asyncHandler(serviceController.getService));
router.put('/:id', asyncHandler(serviceController.updateService));
router.delete('/:id', asyncHandler(serviceController.deleteService));

export default router;