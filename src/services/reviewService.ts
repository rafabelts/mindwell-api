import { RepositoryFactory } from '../factories/repositoryFactory';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { ReviewRepositoryInterface } from '../interfaces/reviewRepositoryInterface';
import { Review } from '../types/review';

export class ReviewService {
	private repository: ReviewRepositoryInterface;

	constructor() {
		this.repository = RepositoryFactory.getRepository('review');
	}

	async addReview(review: Review) {
		return tryCatchHelper(async () => {
			if (!review) throw new Error('Review is missing');
			await this.repository.addReview(review);
		});
	}

	async getReviews(id: string, type: 'user' | 'psychologist') {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('User id is missing');
			if (!type) throw new Error('User type is missing');

			const reviews = await this.repository.getReviews(id, type);

			if (!reviews) throw new Error('Reviews not found');
			return reviews;
		});
	}
}
