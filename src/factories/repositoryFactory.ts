import { AppointmentRepositoryInterface } from '../interfaces/AppointmentRepositoryInterface';
import { ProfessionalManagmentInterface } from '../interfaces/ProfessionalManagmentInterface';
import { ReviewRepositoryInterface } from '../interfaces/ReviewRepositoryInterface';
import { UserRepositoryInterface } from '../interfaces/UserRepositoryInterface';
import { AppointmentRepository } from '../repositories/appointmentRepository';
import { InstitutionRepository } from '../repositories/InstitutionRepository';
import { ProfessionalManagmentRepository } from '../repositories/professionalManagmentRepository';
import { PsychologistRepository } from '../repositories/PsychologistRepository';
import { ReviewRepository } from '../repositories/reviewRepository';
import { UserRepository } from '../repositories/UserRepository';

export class RepositoryFactory {
	// Overload for getting the right repository

	static getRepository(
		type: 'user' | 'psychologist' | 'institution'
	): UserRepositoryInterface<any>;

	static getRepository(type: 'appointment'): AppointmentRepositoryInterface;

	static getRepository(type: 'review'): ReviewRepositoryInterface;

	static getRepository(
		type: 'professionalManagment'
	): ProfessionalManagmentInterface;

	static getRepository(
		type:
			| 'user'
			| 'psychologist'
			| 'institution'
			| 'appointment'
			| 'review'
			| 'professionalManagment'
	):
		| UserRepositoryInterface<any>
		| AppointmentRepositoryInterface
		| ReviewRepositoryInterface
		| ProfessionalManagmentInterface {
		switch (type) {
			case 'user':
				return new UserRepository();
			case 'psychologist':
				return new PsychologistRepository();
			case 'institution':
				return new InstitutionRepository();

			case 'appointment':
				return new AppointmentRepository();

			case 'review':
				return new ReviewRepository();

			case 'professionalManagment':
				return new ProfessionalManagmentRepository();

			default:
				throw new Error('No repository found');
		}
	}
}
