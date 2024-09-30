// Interfaces
import { AppointmentRepositoryInterface } from '../interfaces/appointmentRepositoryInterface';
import { ChatRepositoryInterface } from '../interfaces/chatRepositoryInterface';
import { ProfessionalManagmentInterface } from '../interfaces/professionalManagmentInterface';
import { ReviewRepositoryInterface } from '../interfaces/reviewRepositoryInterface';
import { UserRepositoryInterface } from '../interfaces/userRepositoryInterface';

// Repositories
import { AppointmentRepository } from '../repositories/appointmentRepository';
import { ChatRepository } from '../repositories/chatRepository';
import { InstitutionRepository } from '../repositories/institutionRepository';
import { ProfessionalManagmentRepository } from '../repositories/professionalManagmentRepository';
import { PsychologistRepository } from '../repositories/psychologistRepository';
import { ReviewRepository } from '../repositories/reviewRepository';
import { UserRepository } from '../repositories/userRepository';

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

	static getRepository(type: 'chat'): ChatRepositoryInterface;

	static getRepository(
		type:
			| 'user'
			| 'psychologist'
			| 'institution'
			| 'appointment'
			| 'review'
			| 'professionalManagment'
			| 'chat'
	):
		| UserRepositoryInterface<any>
		| AppointmentRepositoryInterface
		| ReviewRepositoryInterface
		| ProfessionalManagmentInterface
		| ChatRepositoryInterface {
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

			case 'chat':
				return new ChatRepository();

			default:
				throw new Error('No repository found');
		}
	}
}
