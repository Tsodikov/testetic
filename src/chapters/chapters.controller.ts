import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';
import { IChaptersController } from './chapters.controller.interface';
import { IChaptersService } from './chapters.service.interface';
import { ChapterDTO } from './dto/chapter.dto';
import { ChapterOutputDTO } from './dto/chapter.output.dto';

@injectable()
export class ChaptersController extends BaseController implements IChaptersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ChaptersService) private chaptersService: IChaptersService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/get/:orgId', method: 'get', func: this.getAll },
			{ path: '/getchapter/:id', method: 'get', func: this.getChapter },
			{ path: '/add', method: 'post', func: this.addChapter },
			{ path: '/del/:id', method: 'delete', func: this.delChapter },
			{ path: '/update/:id', method: 'patch', func: this.updateChapter },
		]);
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.chaptersService.getAllChapters(Number(req.params.orgId));
		if (!result) {
			return next(new HTTPError(422, 'No one chapter find'));
		}
		this.loggerService.log(`[ChaptersController]: ${result.length} chapters has sended`);
		this.ok(res, result);
	}

	async addChapter(
		{ body }: Request<{}, {}, ChapterDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.chaptersService.createChapter(body);
		if (!result) {
			return next(new HTTPError(422, 'Chapter with this ID alredy exist'));
		}
		this.loggerService.log(
			`[ChaptersController]: New chapter with title ${result.chapterTitle} has added to database`,
		);
		this.ok(res, result);
	}

	async delChapter(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.chaptersService.deleteChapter(Number(req.params.id));
		if (!result) {
			this.send(res, 406, 'param id requiring');
		}
		this.ok(res, result);
	}

	async updateChapter({ params, body }: Request, res: Response, next: NextFunction): Promise<void> {
		if (params.id) {
			const result = await this.chaptersService.updateChapter(Number(params.id), body);
			if (!result) {
				const err = new Error();
				this.send(res, 406, err.message);
			}
			this.ok(res, result);
		} else {
			this.send(res, 406, 'param id requiring');
		}
	}

	async getChapter({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.chaptersService.getChapter(Number(params.id));
		if (!result) {
			const err = new Error();
			this.send(res, 406, err.message);
		}
		this.ok(res, result);
	}
}
