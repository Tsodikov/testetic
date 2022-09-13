import { IChapter } from './chapter.entity.interface';
import { ChapterDTO } from './dto/chapter.dto';
import { ChapterOutputDTO } from './dto/chapter.output.dto';
import { getAllChapterDTO } from './dto/getAllChapter.dto';

export interface IChaptersService {
	createChapter: (dto: ChapterDTO) => Promise<ChapterOutputDTO | undefined>;
	getAllChapters: (orgId: number) => Promise<getAllChapterDTO[] | null>;
	getChapter: (chapterId: number) => Promise<ChapterOutputDTO | undefined>;
	deleteChapter: (id: number) => Promise<number>;
	updateChapter: (id: number, data: ChapterDTO) => Promise<ChapterOutputDTO | undefined>;
}
