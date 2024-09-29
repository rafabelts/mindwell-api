import { Review } from '../types/review';

export interface ReviewRepositoryInterface {
	addReview: (userReview: Review) => void;

	getReviews: (
		id: string,
		type: 'user' | 'psychologist'
	) => Promise<Array<Review>>;
}
