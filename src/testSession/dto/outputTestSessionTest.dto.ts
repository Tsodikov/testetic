import { QuestionModel, QuestionSessionModel, Roles } from '@prisma/client';
import { MediaFileOutputDTO } from '../../mediaFiles/dto/mediaFile.output.dto';

export class OutputTestSessionTestDTO {
	id: number;
	testId: number;
	userId: number;
	registrationDateTime: Date;
	confirmationRegister: Date;
	invitationSended: Date;
	confirmationInvite: Date;
	startTest: Date;
	endTest: Date;
	status: string;
	test: {
		id: number;
		title: string;
		description: string;
		dateOfCreate: Date;
		readyToUse: boolean;
		qtnOfQuestion: number;
		qtnUsers: number;
		testMediaFiles: MediaFileOutputDTO[];
		creatorId: number;
		creatorName: string;
		timeLimitPassTest: boolean;
		timeLimit: number;
		preRegistration: boolean;
		startAnyTime: boolean;
		currentActiveStart: Date;
		currentActiveEnd: Date;
		backToAnyQuestion: boolean;
		showResultQuestion: boolean;
		showResultTest: boolean;
		organization: {
			organizationId: number;
			organizationName: string;
		};
		department: {
			departmentId: number;
		};
		chapter: {
			chapterId: number;
			chapterTitle: string;
		};
	};
	questionSession: QuestionSessionModel[] | null;
}
