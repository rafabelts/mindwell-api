import { RepositoryFactory } from '../factories/repositoryFactory';
import { UserFactory } from '../factories/userFactory';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { InstitutionRepository } from '../repositories/institutionRepository';
import { PsychologistRepository } from '../repositories/psychologistRepository';
import { UserRepository } from '../repositories/userRepository';
import { Institution, Psychologist, User } from '../types/user';

export class UserService {
	async addUser(
		type: 'user' | 'psychologist' | 'institution',
		userData: User | Psychologist | Institution
	) {
		return tryCatchHelper(async () => {
			if (!userData) throw new Error('User data is missing');
			const repository = RepositoryFactory.getRepository(type);
			const user = UserFactory.createUser(type, userData);

			await repository.addUser(user.getData());
		});
	}

	async getUserById(id: string) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('User Id is missing');

			const userRepository = new UserRepository();
			const psychologistRepository = new PsychologistRepository();
			const institutionRepository = new InstitutionRepository();

			const userById = await userRepository.getUserById(id);

			if (!userById) throw new Error('User not found');

			const psychologistById = await psychologistRepository.getUserById(id);

			if (psychologistById && userById.id === psychologistById.id) {
				return {
					type: 'psychologist',
					...psychologistById,
				};
			}

			const institutionById = await institutionRepository.getUserById(id);
			if (
				institutionById &&
				institutionById[0] &&
				userById.id === institutionById[0].id
			) {
				return {
					type: 'institution',
					...institutionById[0]!,
				};
			}

			return {
				type: 'user',
				...userById,
			};
		});
	}

	async getAllUsers(type: 'user' | 'psychologist' | 'institution') {
		return tryCatchHelper(async () => {
			if (type === 'user') throw new Error('Cant get all users data').message;

			const repository = RepositoryFactory.getRepository(type);

			if (repository.getAllUsers) return await repository.getAllUsers();
		});
	}
}
