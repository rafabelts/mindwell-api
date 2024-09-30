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
			if (!userData.schedule) throw new Error('Schedule is missing');

			await db.insert(psychologist).values({
				id: userData.id,
				university: userData.university,
				speciality: userData.speciality,
				professionalId: userData.professionalId,
				description: userData.description,
				address: userData.address ?? '',
			});

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

	async getUserById(id: string) {
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

			if (!psychologistData[0]) throw new Error('Psychologist data not found');

			if (psychologistData[0] && psychologistData[0].isActive !== true) {
				throw new Error('The account is no longer active');
			}

			const schedule = await db.query.scheduleAvailable.findMany({
				where: (model, { eq }) => eq(model.psychologistId, id),
			});

			if (!schedule) throw new Error('Schedule data not found');

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

			if (!institutions) throw new Error('Institution data not found');

			const fullPsychologistData = {
				...psychologistData[0],
				schedule: schedule.filter((schedule) => schedule.isActive === true),
				institutions: institutions.filter(
					(institution) => institution.isActive === true
				),
			};

			if (!fullPsychologistData) throw new Error('Psychologist data not found');

			return fullPsychologistData as Psychologist;
		});
	}

	async getAllUsers() {
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

		if (!psychologistData) throw new Error('Schedule data not found');

		const psychologistsWithExtraData = await Promise.all(
			psychologistData.map(async (psychologist) => {
				const schedule = await db.query.scheduleAvailable.findMany({
					where: (model, { eq }) =>
						eq(model.psychologistId, psychologist.id ?? ''),
				});

				if (!schedule) throw new Error('Schedule data not found');

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

				if (!institutions) throw new Error('Institution data not found');

				return {
					...psychologist,
					schedule: schedule.filter((schedule) => schedule.isActive === true),
					institutions: institutions.filter(
						(institution) => institution.isActive === true
					),
				};
			})
		);

		if (!psychologistsWithExtraData)
			throw new Error('Psychologist with extra data not found');

		return psychologistsWithExtraData as Array<Psychologist>;
	}

	async updateUser(id: string, user: Psychologist) {}

	async deleteUser(id: string) {}
}
