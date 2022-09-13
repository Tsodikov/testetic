import { MediaFileModel, Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { MediaFileToTestInputDTO } from './dto/mediaFile.input.dto';
import { MediaFileToQuestion, MediaFileToTest } from './mediaFile.entity';
import { IMediaFile } from './mediaFile.entity.interface';
import { IMediaFilesRepository } from './mediaFiles.repository.interface';

@injectable()
export class MediaFilesRepository implements IMediaFilesRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async create(mediaFile: IMediaFile): Promise<MediaFileModel | undefined> {
		try {
			const result = await this.prismaService.client.mediaFileModel.create({
				data: {
					url: mediaFile.url,
					filename: mediaFile.filename,
					size: mediaFile.size,
					type: mediaFile.type,
					questionId: mediaFile.questionId,
				},
			});
			return result;
		} catch (err: any) {
			this.loggerService.error(`Error adding to database: ${err.message}`);
		}
	}

	// private async createOneMedia(
	// 	data: MediaFileToTestInputDTO,
	// 	testId: number,
	// ): Promise<MediaFileModel | undefined> {
	// 	const result = await this.prismaService.client.mediaFileModel.create({
	// 		data: {
	// 			url: data.url,
	// 			filename: data.filename,
	// 			size: data.size,
	// 			type: data.type,
	// 			testId: testId,
	// 		},
	// 	});
	// 	return result;
	// }

	async createToTest(mediaFiles: MediaFileToTest[]): Promise<Promise<void>> {
		const data = mediaFiles.map((item) => ({
			url: item.mediaFile.url,
			filename: item.mediaFile.filename,
			size: item.mediaFile.size,
			type: item.mediaFile.type,
			testId: item.mediaFile.testId,
		}));
		const result = await this.prismaService.client.mediaFileModel.createMany({
			data,
			skipDuplicates: true,
		});
		// mediaFiles.map((item) => return {
		// 	url: item.url,
		// 	filename: item.filename,
		// 	size: item.size,
		// 	type: item.type,
		// 	testId,
		// }),
		// mediaFiles.map(async (item) => {
		// 	return await this.createM(item, testId);
		// });
		if (!result) {
			const err = new Error();
			this.loggerService.error(`Error adding to database: ${err.message}`);
		}
		// return result;
	}

	async createToQuestion(mediaFiles: MediaFileToQuestion[]): Promise<Promise<void>> {
		const data = mediaFiles.map((item) => ({
			url: item.mediaFile.url,
			filename: item.mediaFile.filename,
			size: item.mediaFile.size,
			type: item.mediaFile.type,
			questionId: item.mediaFile.questionId,
		}));
		const result = await this.prismaService.client.mediaFileModel.createMany({
			data,
			// skipDuplicates: true,
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`Error adding to database: ${err.message}`);
		}
	}

	async getByQuestion(id: number): Promise<MediaFileModel[] | undefined> {
		try {
			return this.prismaService.client.mediaFileModel.findMany({
				where: {
					questionId: id,
				},
			});
		} catch (err: any) {
			this.loggerService.error(`Error reading database: ${err.message}`);
			return undefined;
		}
	}

	async getByTest(testId: number): Promise<MediaFileModel[] | undefined> {
		try {
			return this.prismaService.client.mediaFileModel.findMany({
				where: {
					testId,
				},
			});
		} catch (err: any) {
			this.loggerService.error(`Error reading database: ${err.message}`);
			return undefined;
		}
	}

	async delete(id: number): Promise<number> {
		const result = await this.prismaService.client.mediaFileModel.delete({
			where: {
				id: id,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`Error deleting from database: ${err.message}`);
		}
		return result.id;
	}

	async deleteAllFromTest(testId: number): Promise<Prisma.BatchPayload> {
		const result = await this.prismaService.client.mediaFileModel.deleteMany({
			where: {
				testId,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`Error deleting from database: ${err.message}`);
		}
		return result;
	}
}
