export class TestInputDTO {
	title: string;
	description: string;
	chapter: {
		id: number;
		chapterTitle: string;
	};
	testCreator: {
		id: number;
		creatorName: string;
	};
	// departmentId: number;
	dateOfCreate: string;
	qtnOfQuestion: number;
	qtnUsers: number;
	readyToUse: boolean;
	organizationId: number;
	departmentId: number;
}
