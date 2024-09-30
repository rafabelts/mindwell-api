import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';
import { AppointmentService } from '../services/appointmentService';

const router = Router();

const appointmentController = new AppointmentController(
	new AppointmentService()
);

router.post(
	'/',
	appointmentController.addAppointment.bind(appointmentController)
);

router.get('/', (req, res) => appointmentController.getAppointments(req, res));

router.get(
	'/:id',
	appointmentController.getAppointmentById.bind(appointmentController)
);

router.put(
	'/',
	appointmentController.rescheduleAppointment.bind(appointmentController)
);

export default router;
