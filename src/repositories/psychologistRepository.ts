import { db } from '../config/db';
import {
	institution,
	psychologist,
	psychologistInstitution,
	scheduleAvailable,
	user,
} from '../config/db/schema';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { UserRepositoryInterface } from '../interfaces/userRepositoryInterface';
import { CanBeUndefined } from '../types';
import { Psychologist } from '../types/user';
import { eq } from 'drizzle-orm';

export class PsychologistRepository
	implements UserRepositoryInterface<Psychologist>
{
	async addUser(userData: Psychologist) {
		return tryCatchHelper(async () => {
			await db.insert(psychologist).values({
				id: userData.id,
				university: userData.university,
				speciality: userData.speciality,
				professionalId: userData.professionalId,
				description: userData.description,
				address: userData.address ?? '',
			});

			if (!userData.schedule) throw new Error('Schedule is missing');

			const schedulePromises = userData.schedule.map((scheduleInfo) =>
				db.insert(scheduleAvailable).values({
					day: scheduleInfo.day,
					startTime: scheduleInfo.startTime,
					endTime: scheduleInfo.endTime,
					psychologistId: userData.id,
				})
			);

			await Promise.all(schedulePromises);
		});
	}

	async getUserById(id: string): Promise<CanBeUndefined<Psychologist>> {
		return tryCatchHelper(async () => {
			const psychologistData = await db
				.select({
					id: user.id,
					name: user.name,
					email: user.email,
					photoUrl: user.photoUrl ?? '',
					isActive: user.isActive,
					isMember: user.isMember,
					university: psychologist.university,
					professionalId: psychologist.professionalId,
					speciality: psychologist.speciality,
					score: psychologist.score,
					address: psychologist.address,
					description: psychologist.description ?? '',
				})
				.from(psychologist)
				.leftJoin(user, eq(user.id, psychologist.id))
				.where(eq(user.id, id));

			if (psychologistData[0] && psychologistData[0].isActive !== true) {
				throw new Error('The account is no longer active');
			}

			const schedule = await db.query.scheduleAvailable.findMany({
				where: (model, { eq }) => eq(model.psychologistId, id),
			});

			const institutions = await db
				.select({
					id: user.id,
					name: user.name,
					email: user.email,
					photoUrl: user.photoUrl ?? '',
					isActive: psychologistInstitution.isActive,
					isMember: user.isMember,
					address: institution.address,
					latitude: institution.latitude,
					length: institution.length,
				})
				.from(psychologistInstitution)
				.leftJoin(institution, eq(psychologistInstitution.psychologistId, id))
				.leftJoin(user, eq(user.id, institution.id))
				.where(eq(psychologistInstitution.psychologistId, id));

			return {
				...psychologistData[0],
				schedule: schedule.filter((schedule) => schedule.isActive === true),
				institutions: institutions.filter(
					(institution) => institution.isActive === true
				),
			} as CanBeUndefined<Psychologist>;
		});
	}

	async getAllUsers(): Promise<Array<CanBeUndefined<Psychologist>>> {
		const psychologistData = await db
			.select({
				id: user.id,
				name: user.name,
				email: user.email,
				photoUrl: user.photoUrl ?? '',
				isActive: user.isActive,
				isMember: user.isMember,
				university: psychologist.university,
				professionalId: psychologist.professionalId,
				speciality: psychologist.speciality,
				score: psychologist.score,
				address: psychologist.address,
				description: psychologist.description ?? '',
			})
			.from(psychologist)
			.leftJoin(user, eq(user.id, psychologist.id))
			.where(eq(user.isActive, true));

		const psychologistsWithExtraData = await Promise.all(
			psychologistData.map(async (psychologist) => {
				const schedule = await db.query.scheduleAvailable.findMany({
					where: (model, { eq }) =>
						eq(model.psychologistId, psychologist.id ?? ''),
				});

				const institutions = await db
					.select({
						id: user.id,
						name: user.name,
						email: user.email,
						photoUrl: user.photoUrl ?? '',
						isActive: psychologistInstitution.isActive,
						isMember: user.isMember,
						address: institution.address,
						latitude: institution.latitude,
						length: institution.length,
					})
					.from(psychologistInstitution)
					.leftJoin(
						institution,
						eq(psychologistInstitution.psychologistId, psychologist.id ?? '')
					)
					.leftJoin(user, eq(user.id, institution.id));

				return {
					...psychologist,
					schedule: schedule.filter((schedule) => schedule.isActive === true),
					institutions: institutions.filter(
						(institution) => institution.isActive === true
					),
				};
			})
		);

		return psychologistsWithExtraData as Array<CanBeUndefined<Psychologist>>;
	}

	async updateUser(id: string, user: Psychologist) {}

	async deleteUser(id: string) {}
}
