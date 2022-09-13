export class getAllChapterDTO {
	id: number;
	chapterTitle: string;
	chapterDescription: string;
	chapterCreators: {
		id: number;
		name: string;
	};
	dateOfCreate: string;
	qtnTests: number;
	// tests: [];
}
