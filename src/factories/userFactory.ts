import { User, Psychologist, Institution } from '../types/user';
import { UserModel } from '../models/User';
import { PsychologistModel } from '../models/Psychologist';
import { InstitutionModel } from '../models/Institution';

export class UserFactory {
	static createUser(
		type: 'user' | 'psychologist' | 'institution',
		userData: User | Psychologist | Institution
	) {
		switch (type) {
			case 'user':
				if (isUser(userData)) {
					return new UserModel(userData);
				}
				throw new Error('Invalid data provided for User');

			case 'psychologist':
				if (isPsychologist(userData)) {
					return new PsychologistModel(userData);
				}
				throw new Error('Invalid data provided for Psychologist');

			case 'institution':
				if (isInstitution(userData)) {
					return new InstitutionModel(userData);
				}
				throw new Error('Invalid data provided for Institution');
		}
	}
}

function isUser(userData: any): userData is User {
	return 'name' in userData && 'email' in userData;
}

function isPsychologist(
	userData: User | Psychologist | Institution
): userData is Psychologist {
	return 'speciality' in userData;
}

function isInstitution(
	userData: User | Psychologist | Institution
): userData is Institution {
	return 'address' in userData && !('speciality' in userData);
}
