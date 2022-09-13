import { MediaFileToTestInputDTO } from '../../mediaFiles/dto/mediaFile.input.dto';

export class CreateTestInputDTO {
	title: string;
	description: string;
	dateOfCreate: Date;
	readyToUse: boolean;
	qtnOfQuestion: number;
	qtnUsers: number;
	testMediaFiles: MediaFileToTestInputDTO[];
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
	organizationId: number;
	departmentId: number;
	chapterId: number;
	chapterTitle: string;
}
