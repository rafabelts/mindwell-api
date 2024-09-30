import { eq } from 'drizzle-orm';
import { db } from '../config/db';
import {
	psychologistInstitution,
	scheduleAvailable,
} from '../config/db/schema';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { ProfessionalManagmentInterface } from '../interfaces/professionalManagmentInterface';
import { AvailabilityInfo } from '../types/user';

export class ProfessionalManagmentRepository
	implements ProfessionalManagmentInterface
{
	async addPsychologistToInstitution(
		institutionId: string,
		psychologistId: string
	) {
		return tryCatchHelper(async () => {
			if (!institutionId) throw new Error('Institution ID is missing');
			if (!psychologistId) throw new Error('Psychologist ID is missing');

			await db.insert(psychologistInstitution).values({
				institutionId: institutionId,
				psychologistId: psychologistId,
			});
		});
	}

	async editPsychologistInstitutionStatus(id: number, status: boolean) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('ID is missing');

			await db
				.update(psychologistInstitution)
				.set({ isActive: status })
				.where(eq(psychologistInstitution.id, id));
		});
	}

	async addAvailability(newAvailability: AvailabilityInfo) {
		return tryCatchHelper(async () => {
			if (!newAvailability) throw new Error('Missing new availability info');

			await db.insert(scheduleAvailable).values({
				day: newAvailability.day,
				startTime: newAvailability.startTime,
				endTime: newAvailability.endTime,
				psychologistId: newAvailability.psychologistId,
			});
		});
	}

	async editAvailability(id: number, newAvailability: AvailabilityInfo) {
		// id is for the availability to be edited
		return tryCatchHelper(async () => {
			if (!id) throw new Error('Availability ID is missing');
			if (!newAvailability) throw new Error('Missing new availability info');

			await db
				.update(scheduleAvailable)
				.set({ isActive: false })
				.where(eq(scheduleAvailable.id, id))
				.then(async () => {
					await db.insert(scheduleAvailable).values({
						day: newAvailability.day,
						startTime: newAvailability.startTime,
						endTime: newAvailability.endTime,
						psychologistId: newAvailability.psychologistId,
					});
				});
		});
	}

	async deleteAvailability(id: number) {
		// id is for the availability to be edited

		return tryCatchHelper(async () => {
			if (!id) throw new Error('Availability ID is missing');

			await db
				.update(scheduleAvailable)
				.set({ isActive: false })
				.where(eq(scheduleAvailable.id, id));
		});
	}
}
