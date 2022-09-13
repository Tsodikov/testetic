export interface IChapter {
	// id: string;
	chapterTitle: string;
	chapterDescription: string;
	chapterCreators: {
		email: string;
		// password: string;
		name: string;
		// jwt: string;
	};
	dateOfCreate: string;
	qtnTests: number;
	organizationId: number;
	// tests: [];
}
