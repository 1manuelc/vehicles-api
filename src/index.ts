import express, { Router } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { brandRouter } from './routes/brandRoutes';

export const app = express();
app.use(express.json());

const apiRouter = Router();
app.use('/api', apiRouter);

apiRouter.use('/brands', brandRouter);

apiRouter.get('/', (_, res) => {
	res.json('Welcome to VehiclesAPI!');
});

app.use(errorHandler);

app.listen(3000, () => {
	console.log('Server running at http://localhost:3000');
});
