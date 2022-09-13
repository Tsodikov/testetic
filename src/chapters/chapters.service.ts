import { ChapterModel, UserModel } from '@prisma/client';
import { id, inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { UsersRepository } from '../users/users.repository';
import { Chapter } from './chapter.entity';
import { IChapter } from './chapter.entity.interface';
import { ChaptersRepository } from './chapters.repository';
import { IChaptersService } from './chapters.service.interface';
import { ChapterDTO } from './dto/chapter.dto';
import { ChapterOutputDTO } from './dto/chapter.output.dto';
import { getAllChapterDTO } from './dto/getAllChapter.dto';

@injectable()
export class ChaptersService implements IChaptersService {
	constructor(
		@inject(TYPES.ChaptersRepository) private chaptersRepository: ChaptersRepository,
		@inject(TYPES.UsersRepository) private usersRepository: UsersRepository,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	private preserveOutput(chapter: ChapterModel): ChapterOutputDTO {
		return {
			id: chapter.id,
			chapterTitle: chapter.chapterTitle,
			chapterDescription: chapter.chapterDescription,
			chapterCreators: {
				id: chapter.userModelId,
				name: chapter.userModelName,
			},
			dateOfCreate: chapter.dateOfCreate,
			qtnTests: chapter.qtnTests,
		};
	}

	async createChapter({
		chapterTitle,
		chapterDescription,
		chapterCreators,
		dateOfCreate,
		qtnTests,
		organizationId,
		tests,
	}: ChapterDTO): Promise<ChapterOutputDTO | undefined> {
		const newChapter = new Chapter(
			chapterTitle,
			chapterDescription,
			chapterCreators,
			dateOfCreate,
			qtnTests,
			organizationId,
			// tests,
		);
		const result = await this.chaptersRepository.create(newChapter.chapter);
		if (!result) {
			this.loggerService.error(`Error adding to database: `);
			return undefined;
		}
		const creator = await this.usersRepository.findById(result.userModelId);
		if (!creator) {
			this.loggerService.error(`Error getting user data`);
			return undefined;
		}
		return this.preserveOutput(result);
	}

	async getAllChapters(orgId: number): Promise<getAllChapterDTO[] | null> {
		const result = await this.chaptersRepository.findAll(orgId);
		return result.map((item) => {
			return this.preserveOutput(item);
		});
	}

	async deleteChapter(id: number): Promise<number> {
		const result = await this.chaptersRepository.delete(id);
		if (!result) {
			this.loggerService.error(`Error deleting from database: `);
		}
		return result.id;
	}

	async updateChapter(id: number, data: ChapterDTO): Promise<ChapterOutputDTO | undefined> {
		const result = await this.chaptersRepository.update(id, data);
		if (!result) {
			this.loggerService.error(`Error deleting from database: `);
		} else {
			return this.preserveOutput(result);
		}
	}

	async getChapter(chapterId: number): Promise<ChapterOutputDTO | undefined> {
		const result = await this.chaptersRepository.find(chapterId);
		if (!result) {
			this.loggerService.error(`Error deleting from database: `);
			return undefined;
		}
		return this.preserveOutput(result);
	}
}
