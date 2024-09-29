import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';
import { AppointmentService } from '../services/AppointmentService';

const router = Router();

const appointmentController = new AppointmentController(
	new AppointmentService()
);

router.post(
	'/generate',
	appointmentController.addAppointment.bind(appointmentController)
);

router.get('/get', (req, res) =>
	appointmentController.getAppointments(req, res)
);

router.get(
	'/get/:id',
	appointmentController.getAppointmentById.bind(appointmentController)
);

router.post(
	'/reschedule',
	appointmentController.rescheduleAppointment.bind(appointmentController)
);

export default router;
