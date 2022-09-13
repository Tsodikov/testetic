import { IChapter } from './chapter.entity.interface';
// import { ChapterDTO } from './dto/chapter.dto';

export class Chapter {
	constructor(
		// private readonly id: string,
		private readonly chapterTitle: string,
		private readonly chapterDescription: string,
		private readonly chapterCreators: {
			readonly email: string;
			// readonly password: string;
			readonly name: string;
			readonly jwt: string;
		},
		private readonly dateOfCreate: string,
		private readonly qtnTests: number,
		private readonly organizationId: number, // private readonly tests: [],
	) {
		// this.id = id;
		this.chapterTitle = chapterTitle;
		this.chapterDescription = chapterDescription;
		this.chapterCreators = chapterCreators;
		this.dateOfCreate = dateOfCreate;
		this.qtnTests = qtnTests;
		// this.tests = tests;
		this.organizationId = organizationId;
	}

	get chapter(): IChapter {
		return {
			// id: this.id,
			chapterTitle: this.chapterTitle,
			chapterDescription: this.chapterDescription,
			chapterCreators: this.chapterCreators,
			dateOfCreate: this.dateOfCreate,
			qtnTests: this.qtnTests,
			organizationId: this.organizationId,
			// tests: this.tests,
		};
	}

	// set chapter(_chapt) {
	// 	this._chapter.id = _chapt.id;
	// 	this._chapter.chapterTitle = _chapt.chapterTitle;
	// 	this._chapter.chapterDescription = _chapt.chapterDescription;
	// 	this._chapter.chapterCreators = _chapt.chapterCreators;
	// 	this._chapter.dateOfCreate = _chapt.dateOfCreate;
	// 	this._chapter.qtnTests = _chapt.qtnTests;
	// 	this._chapter.tests = _chapt.tests;
	// }
}
