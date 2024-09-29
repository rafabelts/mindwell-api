import { Institution, Psychologist, User } from '../types/user';
import { CanBeUndefined } from '../types';

export interface UserRepositoryInterface<
	T extends User | Psychologist | Institution,
> {
	addUser: (userData: T) => void;

	getUserById: (
		id: string
	) => Promise<CanBeUndefined<T> | Array<CanBeUndefined<T>>>;

	getAllUsers?: () => Promise<Array<CanBeUndefined<T>>>;

	updateUser: (id: string, userData: T) => void;

	deleteUser: (id: string) => void;
}
