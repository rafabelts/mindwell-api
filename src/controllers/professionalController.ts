import { Request, Response } from 'express';
import { ProfessionalManagmentService } from '../services/professionalManagmentService';

export class ProfessionalManagmentController {
	private professionalManagmentService: ProfessionalManagmentService;

	constructor(professionalManagmentService: ProfessionalManagmentService) {
		this.professionalManagmentService = professionalManagmentService;
	}

	async addPsychologistToInstitution(req: Request, res: Response) {
		try {
			const { institutionId, psychologistId } = req.body;

			if (!institutionId)
				return res.status(400).json({ message: 'Institution ID is missing' });
			if (!psychologistId)
				return res.status(400).json({ message: 'Psychologist ID is missing' });

			await this.professionalManagmentService.addPsychologistToInstitution(
				institutionId,
				psychologistId
			);

			return res
				.status(201)
				.json({ message: 'Psychologist added to institution' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async deletePsychologistFromInstitution(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) return res.status(400).json({ message: 'ID is missing' });

			const parsedId = parseInt(id as string);

			if (isNaN(parsedId))
				return res.status(400).json({ message: 'Invalid ID format' });

			await this.professionalManagmentService.deletePsychologistFromInstitution(
				parsedId
			);

			return res
				.status(201)
				.json({ message: 'Psychologist deleted from institution' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async addSchedule(req: Request, res: Response) {
		try {
			const { id, scheduleInfo } = req.body;

			if (!id) return res.status(400).json({ message: 'ID is missing' });
			if (!scheduleInfo)
				return res.status(400).json({ message: 'Schedule info is missing' });

			await this.professionalManagmentService.addAvailability({
				id: null,
				isActive: null,
				day: scheduleInfo.day,
				startTime: scheduleInfo.startTime,
				endTime: scheduleInfo.endTime,
				psychologistId: scheduleInfo.psychologistId,
			});
			return res.status(201).json({
				message: 'Schedule added successfully',
			});
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async editSchedule(req: Request, res: Response) {
		try {
			const { id, scheduleInfo } = req.body;

			if (!id) return res.status(400).json({ message: 'ID is missing' });
			if (!scheduleInfo)
				return res.status(400).json({ message: 'Schedule info is missing' });

			await this.professionalManagmentService.editAvailability(id, {
				id: null,
				isActive: null,
				day: scheduleInfo.day,
				startTime: scheduleInfo.startTime,
				endTime: scheduleInfo.endTime,
				psychologistId: scheduleInfo.psychologistId,
			});
			return res.status(201).json({
				message: 'Schedule edited successfully',
			});
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async deleteSchedule(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) return res.status(400).json({ message: 'ID is missing' });

			const parsedId = parseInt(id as string);

			if (isNaN(parsedId))
				return res.status(400).json({ message: 'Invalid ID format' });

			await this.professionalManagmentService.deleteAvailability(parsedId);

			return res.status(201).json({
				message: 'Schedule deleted successfully',
			});
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}
}
