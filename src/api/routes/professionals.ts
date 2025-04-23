import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { professionalController } from '../controllers/professional';


const router = Router();

router.post('/', asyncHandler(professionalController.createProfessional));
router.get('/', asyncHandler(professionalController.listProfessionals));
router.get('/:id', asyncHandler(professionalController.getProfessional));
router.put('/:id', asyncHandler(professionalController.updateProfessional));
router.delete('/:id', asyncHandler(professionalController.deleteProfessional));

export default router;