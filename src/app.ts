import express from 'express';
import { Request, Response } from 'express';

import userRoutes from './routes/userRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import reviewRoutes from './routes/reviewRoutes';
import profesionalManagmentRoutes from './routes/professionalManagmentRoutes';
import chatRoutes from './routes/chatRoutes';

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('<h1>Mindwell revivio</h1>');
});

app.use('/api/user', userRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/manage', profesionalManagmentRoutes);
app.use('/api/chat', chatRoutes);

app.listen(port, () => {
	console.log(`listening at: http://localhost:${port}`);
});
