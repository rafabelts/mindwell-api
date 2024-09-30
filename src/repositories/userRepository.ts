import { eq } from 'drizzle-orm';
import { db } from '../config/db';
import { user } from '../config/db/schema';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { UserRepositoryInterface } from '../interfaces/userRepositoryInterface';
import { CanBeUndefined } from '../types';
import { User } from '../types/user';

export class UserRepository implements UserRepositoryInterface<User> {
	async addUser(userData: User) {
		return tryCatchHelper(async () => {
			await db.insert(user).values(userData);
		});
	}

	async getUserById(id: string): Promise<CanBeUndefined<User>> {
		return tryCatchHelper(async () => {
			const user = await db.query.user.findFirst({
				where: (user) => eq(user.id, id),
			});

			if (!user) {
				throw new Error('Not user found');
			}

			if (user && user.isActive !== true) {
				throw new Error('User is not active');
			}

			return user;
		});
	}

	async updateUser(id: string, user: User) {}

	async deleteUser(id: string) {}
}
