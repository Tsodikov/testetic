import { Request, Response, NextFunction } from 'express';
import { TestOutputDTO } from './dto/testOutputDTO';

export interface ITestsController {
	get: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getByOrgUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getByOrg: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getByDep: ({ params }: Request, res: Response, next: NextFunction) => Promise<void>;
	add: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	del: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	// update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
