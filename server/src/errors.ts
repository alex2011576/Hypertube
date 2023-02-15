import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.name = 'AppError';
		this.statusCode = statusCode;
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, 400);
		this.name = 'ValidationError';
	}
}

export class AuthError extends AppError {
	constructor(message: string) {
		super(message, 401);
		this.name = 'Authorization Error';
	}
}

export class TorrentError extends AppError {
	constructor(message: string) {
		super(message, 424);
		this.name = 'Torrent Error';
	}
	//418 i'm a teapot
	//404
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			error: `${err.message}`
		});
		return;
	}
	console.log(err);
	res.status(500).json({
		error: `Unexpected error: ${getErrorMessage(err)}`
	});
};

export const unknownEndpoint = (_req: Request, res: Response) => {
	res.status(404).send({ error: 'Unknown endpoint' });
};

export const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) return error.message;
	return String(error);
};
