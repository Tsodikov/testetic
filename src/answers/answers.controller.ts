import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { AnswerInputDTO } from './dto/answer.input.dto';
import { IAnswersController } from './answers.controller.interfce';
import { AnswersService } from './answers.service';

@injectable()
export class AnswersController extends BaseController implements IAnswersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.AnswersService) private answersService: AnswersService,
	) {
		super(loggerService);
		this.bindRoutes([{ path: '/get/:questionId', method: 'get', func: this.get }]);
		this.bindRoutes([{ path: '/add', method: 'post', func: this.add }]);
		this.bindRoutes([{ path: '/del/:id', method: 'delete', func: this.del }]);
		this.bindRoutes([{ path: '/update/:id', method: 'patch', func: this.update }]);
	}

	async get({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.answersService.getAnswers(Number(params.questionId));
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[AnswersController]: Error transfer data: ${err.message}`);
		} else {
			this.ok(res, result);
		}
	}

	async add(
		{ body }: Request<{}, {}, AnswerInputDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const addedAnswerId = await this.answersService.createAnswer(body);
			this.ok(res, addedAnswerId);
			this.loggerService.log(
				`[AnswersController]: Answer with id ${addedAnswerId} has added to database`,
			);
		} catch (err: any) {
			this.loggerService.error(`[AnswersController]: Error adding to database: ${err.message}`);
		}
	}

	async del({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.answersService.delAnswer(Number(params.id));
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[AnswersController]: Error adding to database: ${err.message}`);
		}
		this.ok(res, result);
	}

	async update({ params, body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.answersService.updateAnswer(Number(params.id), body);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[AnswersController]: Error updating to database: ${err.message}`);
		}
		this.ok(res, result);
	}
}
