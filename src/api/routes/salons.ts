import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { salonController } from '../controllers/salon';


const router = Router();

router.get('/', asyncHandler(salonController.getSalon));
router.post('/', asyncHandler(salonController.createSalon));
router.get('/list', asyncHandler(salonController.listSalons));
router.put('/:id', asyncHandler(salonController.updateSalon));
router.delete('/:id', asyncHandler(salonController.deleteSalon));

export default router;