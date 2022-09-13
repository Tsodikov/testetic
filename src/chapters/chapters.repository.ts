import { ChapterModel, TestModel, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { Chapter } from './chapter.entity';
import { IChapter } from './chapter.entity.interface';

@injectable()
export class ChaptersRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async create({
		chapterTitle,
		chapterDescription,
		chapterCreators,
		dateOfCreate,
		organizationId,
		qtnTests,
	}: IChapter): Promise<ChapterModel | undefined> {
		try {
			const userCreator: UserModel | null = await this.prismaService.client.userModel.findFirst({
				where: {
					email: chapterCreators.email,
				},
			});
			const chapterId = await this.prismaService.client.chapterModel.create({
				data: {
					chapterTitle,
					chapterDescription,
					dateOfCreate,
					qtnTests,
					organizationId,
					userModelId: userCreator ? userCreator.id : -1,
					// userModelEmail: userCreator ? userCreator.email : '',
					userModelName: userCreator ? userCreator.name : '',
				},
			});
			this.loggerService.log(
				`[ChaptersRepository]: Chapter with id ${chapterId.id} and name ${chapterTitle} has added to database`,
			);
			return chapterId;
		} catch (e: any) {
			this.loggerService.error(
				`[ChaptersRepository]: Error added chapter to database: ${e.messaage}`,
			);
		}
	}

	async delete(id: number): Promise<ChapterModel> {
		const result = await this.prismaService.client.chapterModel.delete({
			where: {
				id,
			},
		});
		if (!result) {
			this.loggerService.error(
				`[ChaptersRepository]: error deleting chapter with id ${id}: error: `,
			);
		}
		return result;
	}

	async update(id: number, chapter: IChapter | ChapterModel): Promise<ChapterModel | undefined> {
		const result = await this.prismaService.client.chapterModel.update({
			where: {
				id,
			},
			data: {
				chapterTitle: chapter.chapterTitle,
				chapterDescription: chapter.chapterDescription,
				dateOfCreate: chapter.dateOfCreate,
				qtnTests: chapter.qtnTests,
				// userModelName: chapter.chapterCreators.name,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[ChaptersRepository]: error updating chapter with id ${id}: error: ${err.message}`,
			);
		}
		this.loggerService.log(`[ChaptersRepository]: chapter with id ${id} has update to database`);
		return result;
	}

	async findAll(orgId: number): Promise<ChapterModel[]> {
		const result = await this.prismaService.client.chapterModel.findMany({
			where: {
				organizationId: orgId,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[ChaptersRepository]: error find all chapters: error: ${err.message}`,
			);
			return [];
		}
		return result;
	}

	async findOrg(chapterId: number): Promise<number | null> {
		const result = await this.prismaService.client.chapterModel.findFirst({
			where: {
				id: chapterId,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[ChaptersRepository]: error find all chapters: error: ${err.message}`,
			);
			return null;
		}
		return result.organizationId;
	}

	async find(id: number): Promise<ChapterModel | null> {
		const result = await this.prismaService.client.chapterModel.findFirst({
			where: {
				id,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[ChaptersRepository]: error find all chapters: error: ${err.message}`,
			);
			return null;
		}
		return result;
	}
}
