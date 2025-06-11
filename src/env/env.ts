import { config } from 'dotenv';
config();

const env = {
	API_PORT: Number(process.env.API_PORT) | 3000,
	...process.env,
};

export default env;
