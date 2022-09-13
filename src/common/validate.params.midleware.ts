import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class ParamsMiddleware implements IMiddleware {
	// constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		// console.log(req.params);
		if (req.params.chapterId) {
			return next();
		}
		if (req.params.testId) {
			return next();
		}
		res.status(422).send({ error: 'Parametr was undefined' });
	}
}
