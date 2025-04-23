import { Router } from 'express';
import { asyncHandler } from '../../helper';
import { appointmentController } from '../controllers/appointment';


const router = Router();

router.post('/', asyncHandler(appointmentController.createAppointment));
router.get('/', asyncHandler(appointmentController.listAppointments));
router.get('/:id', asyncHandler(appointmentController.getAppointment));
router.patch('/:id/status', asyncHandler(appointmentController.updateAppointmentStatus));
router.delete('/:id', asyncHandler(appointmentController.cancelAppointment));

export default router;