import { AvailabilityInfo } from '../types/user';

export interface ProfessionalManagmentInterface {
	addPsychologistToInstitution: (
		institutionId: string,
		psychologistId: string
	) => void;

	editPsychologistInstitutionStatus: (id: number, status: boolean) => void;

	addAvailability: (newAvailability: AvailabilityInfo) => void;

	editAvailability: (id: number, newAvailability: AvailabilityInfo) => void;

	deleteAvailability: (id: number) => void;
}
