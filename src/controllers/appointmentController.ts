import { AppointmentService } from '../services/AppointmentService';
import { Request, Response } from 'express';
export class AppointmentController {
	private appointmentService: AppointmentService;

	constructor(appointmentService: AppointmentService) {
		this.appointmentService = appointmentService;
	}

	async addAppointment(req: Request, res: Response) {
		try {
			const { userId, psychologistId, date } = req.body;

			if (!userId)
				return res.status(400).json({ message: 'Pacient ID is missing' });
			if (!psychologistId)
				return res.status(400).json({ message: 'Psychologist ID is missing' });
			if (!date) return res.status(400).json({ message: 'Date is missing' });

			await this.appointmentService.addAppointment({
				id: null,
				isActive: null,
				originalAppointmentId: null,
				userId: userId,
				psychologistId: psychologistId,
				date: date,
			});

			return res.status(201).json({ message: 'Appointment created' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async getAppointments(req: Request, res: Response) {
		try {
			// id is userId
			const { id, type } = req.query;

			if (!id) return res.status(400).json({ message: 'User ID is missing' });
			if (!type)
				return res.status(400).json({ message: 'User type is missing' });

			const appointments = await this.appointmentService.getAppointments(
				id as string,
				type as 'user' | 'psychologist'
			);

			if (appointments) return res.status(201).json({ message: appointments });
			else return res.status(400).json({ message: 'Appointments not found' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async getAppointmentById(req: Request, res: Response) {
		try {
			// id is appointment id
			const { id } = req.params;

			if (!id) return res.status(400).json({ message: 'ID is missing' });

			const parsedId = parseInt(id as string);

			if (isNaN(parsedId))
				return res.status(400).json({ message: 'Invalid ID format' });

			const appointment =
				await this.appointmentService.getAppointmentById(parsedId);

			if (appointment) return res.status(201).json({ message: appointment });
			else return res.status(400).json({ message: 'Appointment not found' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async rescheduleAppointment(req: Request, res: Response) {
		try {
			const { id, date } = req.body;
			if (!id)
				return res.status(400).json({ message: 'Appointment ID is missing' });
			if (!date) return res.status(400).json({ message: 'Date is missing' });

			await this.appointmentService.rescheduleAppointment(
				id as number,
				date as string
			);

			res.status(201).json({ message: 'Appointment rescheduled' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}
}
