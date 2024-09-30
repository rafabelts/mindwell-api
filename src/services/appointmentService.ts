import { RepositoryFactory } from '../factories/repositoryFactory';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { AppointmentRepositoryInterface } from '../interfaces/appointmentRepositoryInterface';
import { PsychologistRepository } from '../repositories/psychologistRepository';
import { Appointment } from '../types/appointment';

export class AppointmentService {
	private repository: AppointmentRepositoryInterface;

	constructor() {
		this.repository = RepositoryFactory.getRepository('appointment');
	}

	async addAppointment(data: Appointment) {
		return tryCatchHelper(async () => {
			if (!data) throw new Error('Appointment data is missing');

			const psychologistRepository = new PsychologistRepository();
			const psychologistData = psychologistRepository.getUserById(
				data.psychologistId
			);

			if (!psychologistData)
				throw new Error('Error. Psychologist ID not belongs to a psychologist');

			await this.repository.addAppointment(data);
		});
	}

	async getAppointments(id: string, type: 'user' | 'psychologist') {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('User id is missing');
			if (!type) throw new Error('Type is missing');

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
			if (!id) throw new Error('Appointment id is missing');
			if (!date) throw new Error('Date is missing');

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
