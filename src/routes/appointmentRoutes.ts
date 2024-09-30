import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';
import { AppointmentService } from '../services/appointmentService';

const router = Router();

const appointmentController = new AppointmentController(
	new AppointmentService()
);

router.post(
	'/add',
	appointmentController.addAppointment.bind(appointmentController)
);

router.get('/all', (req, res) =>
	appointmentController.getAppointments(req, res)
);

router.get(
	'/:id',
	appointmentController.getAppointmentById.bind(appointmentController)
);

router.post(
	'/reschedule',
	appointmentController.rescheduleAppointment.bind(appointmentController)
);

export default router;
