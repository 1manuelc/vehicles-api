declare namespace NodeJS {
	interface ProcessEnv {
		DATABASE_URL: string;
		API_PORT?: string;
		NODE_ENV: 'development' | 'production' | 'test';
	}
}
