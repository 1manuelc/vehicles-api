import chalk from 'chalk';
import express, { Router } from 'express';
import env from './env/env';
import { errorHandler } from './middlewares/errorHandler';
import { brandRouter } from './routes/brandRoutes';
import { vehicleRouter } from './routes/vehicleRoutes';

export const app = express();
app.use(express.json());

const apiRouter = Router();
app.use('/api', apiRouter);

apiRouter.use('/brands', brandRouter);
apiRouter.use('/vehicles', vehicleRouter);

apiRouter.get('/', (_, res) => {
	res.json('🏁 Welcome to VehiclesAPI!');
});

app.use(errorHandler);

app.listen(env.API_PORT, () => {
	console.log(
		`🚙💨 Server running at ${chalk.cyanBright(
			`http://localhost:${env.API_PORT}`
		)}`
	);
});
