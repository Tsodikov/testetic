import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ParamsMiddleware } from '../common/validate.params.midleware';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { CreateQuestionInputDTO } from './dto/createQuestion.input.dto';
import { QuestionInputDTO } from './dto/question.input.dto';
import { IQuestionsController } from './questions.controller.interfce';
import { QuestionsService } from './questions.service';

@injectable()
export class QuestionsController extends BaseController implements IQuestionsController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.QuestionsService) private questionsService: QuestionsService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/get/:testId',
				method: 'get',
				func: this.get,
				middleware: [new ParamsMiddleware()],
			},
		]);
		this.bindRoutes([{ path: '/add', method: 'post', func: this.add }]);
		this.bindRoutes([{ path: '/del/:id', method: 'delete', func: this.del }]);
		this.bindRoutes([{ path: '/update/:id', method: 'patch', func: this.update }]);
	}

	async get({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.questionsService.getQuestions(Number(params.testId));
			if (!result) {
				this.loggerService.error(`[QuestionsController]: No data to send`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[QuestionsController]: Error transfer data: ${err.message}`);
		}
	}

	async add(
		{ body }: Request<{}, {}, CreateQuestionInputDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const addedQuestion = await this.questionsService.createQuestion(body);
			this.ok(res, addedQuestion);
			this.loggerService.log(
				`[QuestionsController]: Question with id ${addedQuestion} has added to database`,
			);
		} catch (err: any) {
			this.loggerService.error(`[QuestionsController]: Error adding to database: ${err.message}`);
		}
	}

	async del({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.questionsService.deleteQuestion(Number(params.id));
			this.ok(res, result);
			this.loggerService.log(`[QuestionsController]: Question with id ${params.id} has deleted`);
		} catch (err: any) {
			this.loggerService.error(`[QuestionsController]: Error deleting: ${err.message}`);
		}
	}

	async update({ params, body }: Request, res: Response, next: NextFunction): Promise<void> {
		if (params.id) {
			const result = await this.questionsService.updateQuestion(Number(params.id), body);
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
