import { CanBeNull } from '.';

export type User = {
	id: string;
	name: string;
	email: string;
	photoUrl: CanBeNull<string>;
	isActive: boolean;
	isMember: boolean;
};

export type AvailabilityInfo = {
	id: CanBeNull<number>;
	day: string;
	startTime: string;
	endTime: string;
	isActive: CanBeNull<boolean>;
	psychologistId: string;
};

export type Psychologist = {
	id: string;
	university: string;
	professionalId: string; // Cedula del psicoloco
	speciality: string;
	description: string;
	score: number;
	address: string;
	schedule: Array<AvailabilityInfo>;
	institutions: Array<Institution>;
};

export type Institution = {
	id: string;
	address: string;
	latitude: string;
	length: string;
};
