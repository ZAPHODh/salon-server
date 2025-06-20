import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { appointmentController } from '../controllers/appointment';
import { validateBodyMiddleware } from '../middlewares/validate-body';
import { CreateAppointmentSchema } from '../../schemas/appointment';

const router = Router();

router.post('/', validateBodyMiddleware(CreateAppointmentSchema), asyncHandler(appointmentController.createAppointment));
router.get('/', asyncHandler(appointmentController.listAppointments));
router.get('/:id', asyncHandler(appointmentController.getAppointment));
router.put('/:id/', asyncHandler(appointmentController.updateAppointmentStatus));
router.delete('/:id', asyncHandler(appointmentController.cancelAppointment));

export default router;