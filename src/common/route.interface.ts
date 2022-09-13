import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put' | 'options'>;
	func: (req: Request, res: Response, next: NextFunction) => void;
	middleware?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
