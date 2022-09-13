import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { InputQuestionSessionDTO } from './dto/inputQuestionSession.dto';
import { InputTestSessionDTO } from './dto/inputTestSession.dto';
import { ITestSessionController } from './testSession.controller.interface';
import { TestSessionService } from './testSession.service';

@injectable()
export class TestSessionController extends BaseController implements ITestSessionController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.TestSessionService) private testSessionService: TestSessionService,
	) {
		super(loggerService);
		this.bindRoutes([{ path: '/create', method: 'post', func: this.create }]);
		this.bindRoutes([
			{ path: '/getbyusertest/:userId/:testId', method: 'get', func: this.getByUserTestId },
		]);
		this.bindRoutes([{ path: '/getbytest/:testId', method: 'get', func: this.getByTestId }]);
		this.bindRoutes([
			{ path: '/getbyuser/:userId/:status', method: 'get', func: this.getByUserId },
		]);
		this.bindRoutes([{ path: '/update/:id', method: 'patch', func: this.update }]);
		this.bindRoutes([
			{ path: '/createquestionsession', method: 'post', func: this.createQuestionSession },
		]);
		this.bindRoutes([
			{ path: '/updatequestionsession/:id', method: 'patch', func: this.updateQuestionSession },
		]);
		this.bindRoutes([{ path: '/getqsbytsid/:tSId', method: 'get', func: this.getQSbyTSId }]);
	}

	async create(
		{ body }: Request<{}, {}, InputTestSessionDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.testSessionService.createTestSession(body);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionController] Error adding test session ${err.message}`);
		}
		this.ok(res, result);
	}

	async getByUserTestId(req: Request, res: Response, next: NextFunction): Promise<void> {
		const userId = Number(req.params.userId);
		const testId = Number(req.params.testId);
		const result = await this.testSessionService.getByUserTestId(userId, testId);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionController] Error adding test session ${err.message}`);
		}
		this.ok(res, result);
	}

	async getByTestId(req: Request, res: Response, next: NextFunction): Promise<void> {
		const testId = Number(req.params.testId);
		const result = await this.testSessionService.getByTestId(testId);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionController] Error adding test session ${err.message}`);
		}
		this.ok(res, result);
	}

	async getByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
		const userId = Number(req.params.userId);
		const status = String(req.params.status);
		const result = await this.testSessionService.getByUserId(userId, status);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionController] Error adding test session ${err.message}`);
		}
		this.ok(res, result);
	}

	async update({ params, body }: Request, res: Response, next: NextFunction): Promise<void> {
		const id = Number(params.id);
		const result = await this.testSessionService.updateTestSession(id, body);
		if (!result) {
			const err = new Error();
			this.send(res, 406, err.message);
			this.loggerService.error(
				`[TestSessionController] Error updating test session ${err.message}`,
			);
		}
		this.ok(res, result);
	}

	async createQuestionSession(
		{ body }: Request<{}, {}, InputQuestionSessionDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.testSessionService.createQuestionSession(body);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionController] Error adding test session ${err.message}`);
		}
		this.ok(res, result);
	}

	async updateQuestionSession(
		{ params, body }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const id = Number(params.id);
		const result = await this.testSessionService.updateQuestionSession(id, body);
		if (!result) {
			const err = new Error();
			this.send(res, 406, err.message);
			this.loggerService.error(
				`[TestSessionController] Error updating test session ${err.message}`,
			);
		}
		this.ok(res, result);
	}

	async getQSbyTSId(req: Request, res: Response, next: NextFunction): Promise<void> {
		const tSId = Number(req.params.tSId);
		const result = await this.testSessionService.getQSbyTSId(tSId);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionController] Error adding test session ${err.message}`);
		}
		this.ok(res, result);
	}
}
