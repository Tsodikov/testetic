// import { IChapter } from '../chapter.entity.interface';

export class ChapterDTO {
	chapterTitle: string;
	chapterDescription: string;
	chapterCreators: {
		email: string;
		name: string;
		jwt: string;
	};
	dateOfCreate: string;
	qtnTests: number;
	organizationId: number;
	tests: [];
}
