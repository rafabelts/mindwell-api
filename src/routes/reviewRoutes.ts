import { Router } from 'express';

import { ReviewController } from '../controllers/ReviewController';
import { ReviewService } from '../services/ReviewService';

const router = Router();
const reviewController = new ReviewController(new ReviewService());

router.post('/add', reviewController.addReview.bind(reviewController));
router.get('/', (req, res) => reviewController.getReview(req, res));

export default router;
