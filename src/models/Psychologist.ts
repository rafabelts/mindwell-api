import { AvailabilityInfo, Institution, Psychologist } from '../types/user';
import { UserModel } from './User';

export class PsychologistModel {
	private id: string;
	private university: string;
	private professionalId: string; // Cedula del psicoloco
	private speciality: string;
	private description: string;
	private score: number;
	private address: string;
	private schedule: Array<AvailabilityInfo>;
	private institutions: Array<Institution>;

	constructor(psychologistData: Psychologist) {
		this.id = psychologistData.id;
		this.university = psychologistData.university;
		this.professionalId = psychologistData.professionalId; // Cedula del psicoloco
		this.speciality = psychologistData.speciality;
		this.description = psychologistData.description;
		this.score = psychologistData.score;
		this.address = psychologistData.address;
		this.schedule = psychologistData.schedule;
		this.institutions = psychologistData.institutions;
	}

	getData(): Psychologist {
		return {
			id: this.id,
			university: this.university,
			professionalId: this.professionalId,
			speciality: this.speciality,
			description: this.description,
			score: this.score,
			address: this.address,
			schedule: this.schedule,
			institutions: this.institutions,
		};
	}
}
