import { IChapter } from './chapter.entity.interface';
import { ChapterModel, UserModel } from '@prisma/client';

export interface IChaptersRepository {
	create: (chapter: IChapter) => Promise<ChapterModel | undefined>;
	findAll: (orgId: number) => Promise<ChapterModel[]>;
	find: (id: number) => Promise<ChapterModel | null>;
	delete: (id: number) => Promise<ChapterModel>;
	update: (id: number, chapter: IChapter | ChapterModel) => Promise<ChapterModel | undefined>;
}
