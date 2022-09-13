import { QuestionModel } from '@prisma/client';

export class GetTestDTO {
	id: number;
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
	dateOfCreate: Date;
	qtnOfQuestion: number;
	qtnUsers: number;
	readyToUse: boolean;
	organization: {
		id: number;
		organizationTitle: string;
	};
	questions: QuestionModel[];
}
