import { Request, Response, NextFunction } from 'express';

export interface ITestSessionController {
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getByUserTestId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getByTestId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getByUserId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	createQuestionSession: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	updateQuestionSession: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getQSbyTSId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
