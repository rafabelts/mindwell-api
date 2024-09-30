import { Emotion } from '../types/emotionalRecord';

export interface EmotionalRecordRepositoryInterface {
	addRecord: (data: Emotion) => void;

	getRecordById: (recordId: number) => Promise<Emotion>;

	getUserRecords: (userId: string) => Promise<Array<Emotion>>;

	editRecordStatus: (recordId: number, status: boolean) => void;
}
