import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ParamsMiddleware } from '../common/validate.params.midleware';
import { ILogger } from '../logger/logger.interface';
import { QuestionsService } from '../questions/questions.service';
import { TYPES } from '../types';
import { CreateTestInputDTO } from './dto/createTest.input.dto';
import { ITestsController } from './tests.controller.interface';
import { TestsService } from './tests.service';

@injectable()
export class TestsController extends BaseController implements ITestsController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.TestsService) private testsService: TestsService,
		@inject(TYPES.QuestionsService) private questionsService: QuestionsService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/get/:chapterId',
				method: 'get',
				func: this.get,
				middleware: [new ParamsMiddleware()],
			},
		]);
		this.bindRoutes([{ path: '/getbyid/:testId', method: 'get', func: this.getById }]);
		this.bindRoutes([{ path: '/getbyorg/:orgId/:userId', method: 'get', func: this.getByOrgUser }]);
		this.bindRoutes([{ path: '/getbydep/:depId', method: 'get', func: this.getByDep }]);
		this.bindRoutes([{ path: '/gettestbyorg/:orgId', method: 'get', func: this.getByOrg }]);
		this.bindRoutes([{ path: '/add', method: 'post', func: this.add }]);
		this.bindRoutes([{ path: '/del/:testId', method: 'delete', func: this.del }]);
		this.bindRoutes([{ path: '/update/:id', method: 'patch', func: this.update }]);
	}

	async get({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.testsService.getTests(Number(params.chapterId));
			if (!result) {
				this.loggerService.error(`[TestsController]: No data to send`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[TestsController]: Error transfer data: ${err.message}`);
		}
	}

	async getById({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.testsService.getTestById(Number(params.testId));

			if (!result) {
				this.loggerService.error(`[TestsController]: No data to send`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[TestsController]: Error transfer data: ${err.message}`);
		}
	}

	async getByOrgUser({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.testsService.getTestsByOrgUser(
				Number(params.orgId),
				Number(params.userId),
			);

			if (!result) {
				this.loggerService.error(`[TestsController]: No data to send`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[TestsController]: Error transfer data: ${err.message}`);
		}
	}

	async getByOrg({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.testsService.getTestsByOrg(Number(params.orgId));

			if (!result) {
				this.loggerService.error(`[TestsController]: No data to send`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[TestsController]: Error transfer data: ${err.message}`);
		}
	}

	async getByDep({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.testsService.getTestsByDep(Number(params.depId));

			if (!result) {
				this.loggerService.error(`[TestsController]: No data to send`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[TestsController]: Error transfer data: ${err.message}`);
		}
	}

	async add(
		{ body }: Request<{}, {}, CreateTestInputDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const addedTest = await this.testsService.createTest(body);
		if (!addedTest) {
			const err = new Error();
			this.loggerService.error(`[TestsController]: Error adding to database: ${err.message}`);
		}
		this.ok(res, addedTest);
		this.loggerService.log(`[TestsController]: Test with id ${addedTest} has added to database`);
	}

	async del({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		const resDelQestions = await this.testsService.deleteTest(Number(params.testId));
		if (!resDelQestions) {
			const err = new Error();
			this.loggerService.error(`[TestsController]: Error adding to database: ${err.message}`);
			// return next(new HTTPError(422, `Test with id ${params.testId} not exist`));
		}
		this.ok(res, resDelQestions?.id);
	}

	async update({ params, body }: Request, res: Response, next: NextFunction): Promise<void> {
		if (params.id) {
			const result = await this.testsService.updateTest(Number(params.id), body);
			if (!result) {
				const err = new Error();
				this.send(res, 406, err.message);
			}
			this.ok(res, result);
		} else {
			this.send(res, 406, 'param id requiring');
		}
	}
}
