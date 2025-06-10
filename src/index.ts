import express from 'express';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use(errorHandler);

app.get('/', (req, res) => {
	res.send('API funcionando!');
});

app.listen(3000, () => {
	console.log('Server running at http://localhost:3000');
});
