import express from 'express';
import cors from 'cors';
import routes from './routes/api';
import authMiddleware from './middleware/auth.middleware';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use('/api', authMiddleware);
app.use('/api', routes);

export default app;