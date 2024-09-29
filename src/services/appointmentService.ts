import { RepositoryFactory } from '../factories/repositoryFactory';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { AppointmentRepositoryInterface } from '../interfaces/AppointmentRepositoryInterface';
import { Appointment } from '../types/appointment';

export class AppointmentService {
	private repository: AppointmentRepositoryInterface;

	constructor() {
		this.repository = RepositoryFactory.getRepository('appointment');
	}

	async addAppointment(data: Appointment) {
		return tryCatchHelper(async () => {
			if (!data) throw new Error('Appointment data is missing');
			await this.repository.addAppointment(data);
		});
	}

	async getAppointments(id: string, type: 'user' | 'psychologist') {
		return tryCatchHelper(async () => {
			const appointments = await this.repository.getAppointments(id, type);

			if (!appointments) throw new Error('No appointments found');

			return appointments;
		});
	}

	async getAppointmentById(id: number) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('Id is missing');

			const appointment = await this.repository.getAppointmentById(id);

			if (!appointment) throw new Error('None appointment found');

			return appointment;
		});
	}

	async rescheduleAppointment(id: number, date: string) {
		return tryCatchHelper(async () => {
			const originalAppointment = await this.repository.getAppointmentById(id);

			if (!originalAppointment)
				throw new Error('Couldn´t find the appointment');

			await this.repository.changeAppointmentStatus(originalAppointment.id!);

			await this.repository.addAppointment({
				id: null,
				isActive: null,
				date: date,
				originalAppointmentId: originalAppointment.id,
				userId: originalAppointment.userId,
				psychologistId: originalAppointment.psychologistId,
			});
		});
	}
}
