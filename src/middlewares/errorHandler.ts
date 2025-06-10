import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';

export function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	let statusCode = err instanceof ApiError ? err.statusCode : 500;
	let message = err.message || 'Internal Server Error';
	let details = err.details;

	res.status(statusCode).json({
		sucess: false,
		error: {
			message,
			details,
		},
	});
}
