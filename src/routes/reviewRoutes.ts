import { Router } from 'express';

import { ReviewController } from '../controllers/reviewController';
import { ReviewService } from '../services/reviewService';

const router = Router();
const reviewController = new ReviewController(new ReviewService());

router.post('/', reviewController.addReview.bind(reviewController));
router.get('/', (req, res) => reviewController.getReview(req, res));

export default router;
