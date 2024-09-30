import { db } from '../config/db';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { ReviewRepositoryInterface } from '../interfaces/reviewRepositoryInterface';
import { Review } from '../types/review';
import { appointment, review, user } from '../config/db/schema';
import { eq } from 'drizzle-orm';

export class ReviewRepository implements ReviewRepositoryInterface {
	async addReview(data: Review) {
		return tryCatchHelper(async () => {
			if (!data) throw new Error('Review data is missing');

			await db.insert(review).values({
				score: data.score,
				comment: data.comment,
				appointmentId: data.appointmentId,
			});
		});
	}

	async getReviews(id: string, type: 'user' | 'psychologist') {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('User ID is missing');
			if (!type) throw new Error('User type is missing');

			const isUser = type === 'user';

			const joinCondition = isUser
				? appointment.userId
				: appointment.psychologistId;

			const reviews = await db
				.select({
					id: review.id,
					score: review.score,
					comment: review.comment,
					appointmentId: review.appointmentId,
				})
				.from(review)
				.leftJoin(appointment, eq(appointment.id, review.appointmentId))
				.leftJoin(user, eq(user.id, joinCondition))
				.where(eq(user.id, id));

			if (!reviews) throw new Error('No reviews found');
			return reviews;
		});
	}
}
