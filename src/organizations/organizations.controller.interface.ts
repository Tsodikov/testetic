import { Request, Response, NextFunction } from 'express';

export interface IOrganizationController {
	// getInfo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	add: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	addDep: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getByChapterId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getDepByOrg: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	// getTestsOrgByTestCreator: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	delDep: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	// update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
