export class ApiError extends Error {
	public statusCode: number;
	public details: any;

	constructor(statusCode: number, message: string, details?: any) {
		super(message);
		(this.statusCode = statusCode), (this.details = details);
		Object.setPrototypeOf(this, ApiError.prototype);
	}
}
