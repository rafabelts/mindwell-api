import { db } from '../config/db';
import { emotionalRecord } from '../config/db/schema';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { EmotionalRecordRepositoryInterface } from '../interfaces/emotionalRecordRepositoryInterface';
import { Emotion } from '../types/emotionalRecord';
import { eq } from 'drizzle-orm';

export class EmotionalRecordRepository
	implements EmotionalRecordRepositoryInterface
{
	async addRecord(data: Emotion) {
		return tryCatchHelper(async () => {
			if (!data) throw new Error('Data about emotion not found');
			await db.insert(emotionalRecord).values({
				emotion: data.emotion,
				description: data.description,
				userId: data.userId,
			});
		});
	}

	async getRecordById(recordId: number) {
		return tryCatchHelper(async () => {
			if (!recordId) throw new Error('Record ID is missing');

			const emotion = await db.query.emotionalRecord.findFirst({
				where: (model, { eq }) => eq(model.id, recordId),
			});

			if (!emotion) throw new Error('Cant find emotion record');

			return emotion;
		});
	}

	async getUserRecords(userId: string) {
		return tryCatchHelper(async () => {
			if (!userId) throw new Error('Record ID is missing');

			const emotions = await db.query.emotionalRecord.findMany({
				where: (model, { eq }) => eq(model.userId, userId),
			});

			return emotions;
		});
	}

	async editRecordStatus(recordId: number, status: boolean) {
		return tryCatchHelper(async () => {
			if (!recordId) throw new Error('Record ID is missing');

			await db
				.update(emotionalRecord)
				.set({ isActive: status })
				.where(eq(emotionalRecord.id, recordId));
		});
	}
}
