import { Appointment } from '../types/appointment';

export interface AppointmentRepositoryInterface {
	addAppointment: (data: Appointment) => void;

	getAppointments: (
		id: string,
		type: 'user' | 'psychologist'
	) => Promise<Array<Appointment>>;

	getAppointmentById: (id: number) => Promise<Appointment>;

	changeAppointmentStatus: (id: number) => void;
}
