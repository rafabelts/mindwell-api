import { eq } from 'drizzle-orm';
import { db } from '../config/db';
import { appointment } from '../config/db/schema';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { AppointmentRepositoryInterface } from '../interfaces/appointmentRepositoryInterface';
import { Appointment } from '../types/appointment';

export class AppointmentRepository implements AppointmentRepositoryInterface {
	async addAppointment(data: Appointment) {
		return tryCatchHelper(async () => {
			if (!data.userId) throw new Error('Pacient is missing');
			if (!data.psychologistId) throw new Error('Psychologist is missing');

			await db.insert(appointment).values({
				date: data.date,
				originalAppointmentId: data.originalAppointmentId,
				userId: data.userId,
				psychologistId: data.psychologistId,
			});
		});
	}

	async getAppointments(id: string, type: 'user' | 'psychologist') {
		return tryCatchHelper(async () => {
			const field = type === 'user' ? 'userId' : 'psychologistId';

			const appointments = await db.query.appointment.findMany({
				where: (model, { eq }) => eq(model[field], id),
			});

			if (!appointments) throw new Error('Sorry, this user doesn´t have dates');

			return appointments;
		});
	}

	async getAppointmentById(id: number) {
		const appointment = await db.query.appointment.findFirst({
			where: (model, { eq }) => eq(model.id, id),
		});

		if (!appointment) throw new Error('None appointment found');

		return appointment;
	}

	async changeAppointmentStatus(id: number) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('Id is missing');

			await db
				.update(appointment)
				.set({ isActive: false })
				.where(eq(appointment.id, id));
		});
	}
}
