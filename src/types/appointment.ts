import { CanBeNull } from '.';

export type Appointment = {
	id: CanBeNull<number>;
	date: string;
	isActive: CanBeNull<boolean>;
	originalAppointmentId: CanBeNull<number>;
	userId: string;
	psychologistId: string;
};
