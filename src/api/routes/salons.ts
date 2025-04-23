import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { salonController } from '../controllers/salon';


const router = Router();

router.post('/', asyncHandler(salonController.createSalon));
router.get('/', asyncHandler(salonController.listSalons));
router.get('/:id', asyncHandler(salonController.getSalon));
router.put('/:id', asyncHandler(salonController.updateSalon));
router.delete('/:id', asyncHandler(salonController.deleteSalon));

export default router;