import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { MediaFileInputDTO } from './dto/mediaFile.input.dto';
import { IMediaFilesController } from './mediaFiles.controller.interfce';
import { MediaFilesService } from './mediaFiles.service';

@injectable()
export class MediaFilesController extends BaseController implements IMediaFilesController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.MediaFilesService) private mediaFilesService: MediaFilesService,
	) {
		super(loggerService);
		this.bindRoutes([{ path: '/get/:questionId', method: 'get', func: this.get }]);
		this.bindRoutes([{ path: '/add', method: 'post', func: this.add }]);
		this.bindRoutes([{ path: '/del/:id', method: 'delete', func: this.del }]);
		this.bindRoutes([{ path: '/update/:id', method: 'get', func: this.update }]);
	}

	async get({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.mediaFilesService.getMediaFiles(Number(params.questionId));
			if (!result) {
				this.loggerService.error(`[MediaFilesController]: No data to send`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[MediaFilesController]: Error transfer data: ${err.message}`);
		}
	}

	async add(
		{ body }: Request<{}, {}, MediaFileInputDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const addedMediaFile = await this.mediaFilesService.createMediaFile(body);
			this.ok(res, addedMediaFile);
			this.loggerService.log(
				`[MediaFilesController]: MediaFile with id ${addedMediaFile?.id} has added to database`,
			);
		} catch (err: any) {
			this.loggerService.error(`[MediaFilesController]: Error adding to database: ${err.message}`);
		}
	}

	async del({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		const resDelMedia = await this.mediaFilesService.deleteMedia(Number(params.id));
		if (!resDelMedia) {
			const err = new Error();
			this.loggerService.error(`[MediaFilesController]: Error adding to database: ${err.message}`);
		}
		this.ok(res, resDelMedia);
		this.loggerService.log(
			`[TestsController]: MediaFile id: ${resDelMedia} has deleted from database: `,
		);
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		return undefined;
	}
}
