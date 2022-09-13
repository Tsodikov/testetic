import { MediaFileModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { MediaFileInputDTO } from './dto/mediaFile.input.dto';
import { MediaFileOutputDTO } from './dto/mediaFile.output.dto';
import { MediaFile } from './mediaFile.entity';
import { MediaFilesRepository } from './mediaFiles.repository';
import { IMediaFilesService } from './mediaFiles.service.interface';

@injectable()
export class MediaFilesService implements IMediaFilesService {
	constructor(
		@inject(TYPES.MediaFilesRepository) private mediaFilesRepository: MediaFilesRepository,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async createMediaFile({
		filename,
		size,
		type,
		url,
	}: MediaFileInputDTO): Promise<MediaFileOutputDTO | undefined> {
		const newMediaFile = new MediaFile(filename, size, type, url);
		const result = await this.mediaFilesRepository.create(newMediaFile.mediaFile);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[MediaFilesService]: Error getMediaFiles: ${err.message}`);
		} else {
			return result;
		}
	}

	private preserveOutput(mediaFile: MediaFileModel[]): MediaFileOutputDTO[] {
		return mediaFile.map((item) => {
			return {
				id: item.id,
				filename: item.filename,
				size: item.size,
				type: item.type,
				url: item.url,
			};
		});
	}

	async getMediaFiles(questionId: number): Promise<MediaFileOutputDTO[] | undefined> {
		const mediaFile = await this.mediaFilesRepository.getByQuestion(questionId);
		if (!mediaFile) {
			const err = new Error();
			this.loggerService.error(`[MediaFilesService]: Error getMediaFiles: ${err.message}`);
			return undefined;
		}
		return this.preserveOutput(mediaFile);
	}

	async deleteMedia(id: number): Promise<number> {
		const resDelMedia = await this.mediaFilesRepository.delete(id);
		if (!resDelMedia) {
			const err = new Error();
			this.loggerService.error(`[MediaFilesService]: Error deleting MediaFiles: ${err.message}`);
		}
		return resDelMedia;
	}
}
