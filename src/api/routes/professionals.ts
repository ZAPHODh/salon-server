import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { professionalController } from '../controllers/professional';
import { validateBodyMiddleware } from '../middlewares/validate-body';
import { createProfessionalSchema } from '../../schemas/professional';


const router = Router();

router.post('/', validateBodyMiddleware(createProfessionalSchema), asyncHandler(professionalController.createProfessional));
router.get('/', asyncHandler(professionalController.listProfessionals));
router.get('/:id', asyncHandler(professionalController.getProfessional));
router.put('/:id', asyncHandler(professionalController.updateProfessional));
router.delete('/:id', validateBodyMiddleware(createProfessionalSchema), asyncHandler(professionalController.deleteProfessional));

export default router;