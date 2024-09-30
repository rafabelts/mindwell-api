import { Request, Response } from 'express';
import { ReviewService } from '../services/reviewService';

export class ReviewController {
	private reviewService: ReviewService;

	constructor(service: ReviewService) {
		this.reviewService = service;
	}

	async addReview(req: Request, res: Response) {
		try {
			// id is appointment Id
			const { score, comment, id } = req.body;

			if (!score) return res.status(400).json({ message: 'Score is missing' });
			if (!comment)
				return res.status(400).json({ message: 'Comment is missing' });
			if (!id)
				return res.status(400).json({ message: 'Appointment ID is missing' });

			await this.reviewService.addReview({
				id: null,
				score: score as number,
				comment: comment as string,
				appointmentId: id as number,
			});

			res.status(201).json({ message: 'Review created' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async getReview(req: Request, res: Response) {
		try {
			// id is user id
			const { id, type } = req.query;

			if (!id) return res.status(400).json({ message: 'User ID is missing' });
			if (!type)
				return res.status(400).json({ message: 'User type is missing' });

			const reviews = await this.reviewService.getReviews(
				id as string,
				type as 'user' | 'psychologist'
			);

			if (reviews) return res.status(201).json({ message: reviews });
			else return res.status(400).json({ message: 'No reviews found' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}
}
