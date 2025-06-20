import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { professionalController } from '../controllers/professional';
import { validateBodyMiddleware } from '../middlewares/validate-body';
import { createProfessionalSchema, updateProfessionalSchema } from '../../schemas/professional';


const router = Router();

router.post('/', validateBodyMiddleware(createProfessionalSchema), asyncHandler(professionalController.createProfessional));
router.get('/', asyncHandler(professionalController.listProfessionals));
router.get('/:slug', asyncHandler(professionalController.getProfessional));
router.put('/:id', validateBodyMiddleware(updateProfessionalSchema), asyncHandler(professionalController.updateProfessional));
router.delete('/:id', validateBodyMiddleware(createProfessionalSchema), asyncHandler(professionalController.deleteProfessional));

export default router;