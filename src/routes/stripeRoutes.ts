import { Router } from 'express';
import { StripeController } from '../controllers/stripeController';
const router = Router();

const stripeController = new StripeController();

router.post('/payment', (req, res) => stripeController.payment(req, res));

export default router;

