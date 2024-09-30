import { Request, Response } from 'express';
import { EmotionalRecordService } from '../services/emotionalRecordService';

export class EmotionalRecordController {
	private emotionalRecordService: EmotionalRecordService;

	constructor(service: EmotionalRecordService) {
		this.emotionalRecordService = service;
	}

	async addRecord(req: Request, res: Response) {
		try {
			const { emotion, description, userId } = req.body;

			if (!emotion)
				return res.status(400).json({ message: 'Emotion is missing' });
			if (!userId)
				return res.status(400).json({ message: 'User id is missing' });

			await this.emotionalRecordService.addRecord({
				id: null,
				isActive: null,
				date: null,
				emotion: emotion,
				description: description,
				userId: userId,
			});

			return res.status(201).json({ message: 'Emotional record added' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async getRecordById(req: Request, res: Response) {
		try {
			const { id } = req.params;

			if (!id) return res.status(400).json({ message: 'Record id is missing' });

			const parsedId = parseInt(id);

			if (isNaN(parsedId))
				return res.status(400).json({ message: 'Record id is invalid' });

			const record = await this.emotionalRecordService.getRecordById(parsedId);

			if (!record) return res.status(400).json({ message: 'Record not found' });

			return res.status(201).json({ message: record });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async getRecords(req: Request, res: Response) {
		try {
			const { id } = req.params;

			if (!id) return res.status(400).json({ message: 'User id is missing' });

			const records = await this.emotionalRecordService.getUserRecords(id);

			if (!records)
				return res.status(400).json({ message: 'Records not found' });

			return res.status(201).json({ message: records });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async editUserRecords(req: Request, res: Response) {
		try {
			const { id, emotion, description, userId } = req.body;

			if (!id)
				return res
					.status(400)
					.json({ message: 'Emotional record id is missing' });
			if (!emotion)
				return res.status(400).json({ message: 'Emotion is missing' });
			if (!userId)
				return res.status(400).json({ message: 'User id is missing' });

			await this.emotionalRecordService.editUserRecords(id, {
				id: null,
				isActive: null,
				date: null,
				emotion: emotion,
				description: description,
				userId: userId,
			});

			return res.status(201).json({ message: 'Record edited' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async deleteUserRecord(req: Request, res: Response) {
		try {
			const { id } = req.params;

			if (!id)
				return res
					.status(400)
					.json({ message: 'Emotional record id is missing' });

			const parsedId = parseInt(id);

			if (isNaN(parsedId))
				return res
					.status(400)
					.json({ message: 'Emotional record id is invalid' });

			await this.emotionalRecordService.deleteUserRecord(parsedId);

			return res.status(201).json({ message: 'Record deleted' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}
}
