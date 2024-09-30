import { RepositoryFactory } from '../factories/repositoryFactory';
import { EmotionalRecordRepositoryInterface } from '../interfaces/emotionalRecordRepositoryInterface';
import { Emotion } from '../types/emotionalRecord';
import { tryCatchHelper } from '../helpers/tryCatchHelper';

export class EmotionalRecordService {
	private repository: EmotionalRecordRepositoryInterface;

	constructor() {
		this.repository = RepositoryFactory.getRepository('emotionalRecord');
	}

	async addRecord(data: Emotion) {
		return tryCatchHelper(async () => {
			if (!data) throw new Error('Data of emotion not found');

			await this.repository.addRecord(data);
		});
	}

	async getRecordById(id: number) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('Emotional record is missing');

			const record = await this.repository.getRecordById(id);

			if (!record) throw new Error('Emotional record not found');

			return record;
		});
	}

	async getUserRecords(id: string) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('User id is missing');

			const records = await this.repository.getUserRecords(id);

			if (!records) throw new Error('No emotional records found');

			return records;
		});
	}

	async editUserRecords(id: number, data: Emotion) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('Record Id is missing');
			if (!data) throw new Error('New emotion record data is missing');

			await this.repository.editRecordStatus(id, false);
			await this.repository.addRecord(data);
		});
	}

	async deleteUserRecord(id: number) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('Record Id is missing');
			await this.repository.editRecordStatus(id, false);
		});
	}
}
