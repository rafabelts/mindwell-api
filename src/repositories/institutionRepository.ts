import { eq } from 'drizzle-orm';
import { db } from '../config/db';
import { institution, user } from '../config/db/schema';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { UserRepositoryInterface } from '../interfaces/userRepositoryInterface';
import { Institution } from '../types/user';

export class InstitutionRepository
	implements UserRepositoryInterface<Institution>
{
	async addUser(userData: Institution) {
		return tryCatchHelper(async () => {
			await db.insert(institution).values({
				id: userData.id,
				address: userData.address,
				latitude: userData.latitude,
				length: userData.length,
			});
		});
	}

	async getUserById(id: string) {
		return tryCatchHelper(async () => {
			const institutionData = await db
				.select({
					id: user.id,
					name: user.name,
					email: user.email,
					photoUrl: user.photoUrl ?? '',
					isActive: user.isActive,
					isMember: user.isMember,
					address: institution.address,
					latitude: institution.latitude,
					length: institution.length,
				})
				.from(institution)
				.leftJoin(user, eq(user.id, institution.id))
				.where(eq(user.id, id));

			if (!institutionData) throw new Error('No institution data found');

			return institutionData as Array<Institution>;
		});
	}

	async getAllUsers() {
		return tryCatchHelper(async () => {
			const institutionData = await db
				.select({
					id: user.id,
					name: user.name,
					email: user.email,
					photoUrl: user.photoUrl ?? '',
					isMember: user.isMember,
					address: institution.address,
					latitude: institution.latitude,
					length: institution.length,
				})
				.from(institution)
				.leftJoin(user, eq(user.id, institution.id))
				.where(eq(user.isActive, true));

			if (!institutionData) throw new Error('No institution data found');

			return institutionData as Array<Institution>;
		});
	}

	async updateUser(id: string, user: Institution) {}

	async deleteUser(id: string) {}
}
