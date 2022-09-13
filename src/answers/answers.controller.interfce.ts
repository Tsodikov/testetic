import { Request, Response, NextFunction } from 'express';

export interface IAnswersController {
	get: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	add: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	del: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
