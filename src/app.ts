import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import userRoutes from './routes/userRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import reviewRoutes from './routes/reviewRoutes';
import profesionalManagmentRoutes from './routes/professionalManagmentRoutes';
import chatRoutes from './routes/chatRoutes';
import emotionalRecordRoutes from './routes/emotionalRecordRoutes';

import { rateLimit } from './middlewares/rateLimiting';

const app = express();
const Stripe = require('stripe');
const stripeKey = process.env.STRIPE_KEY;
const stripe = new Stripe(stripeKey);

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({ message: err.message });
});

// Rate limit to /api route
app.use('/api', rateLimit(100, 10 * 60 * 1000));

app.get('/', (req: Request, res: Response) => {
	res.send('<h1>Mindwell revivio</h1>');
});

app.use('/api/user', userRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/manage', profesionalManagmentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/emotional-record', emotionalRecordRoutes);

app.listen(port);
