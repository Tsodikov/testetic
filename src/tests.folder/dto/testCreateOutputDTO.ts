import { ChapterOutputDTO } from '../../chapters/dto/chapter.output.dto';
import { MediaFileOutputDTO } from '../../mediaFiles/dto/mediaFile.output.dto';

export class TestCreateOutputDTO {
	id: number;
	title: string;
	description: string;
	dateOfCreate: Date;
	readyToUse: boolean;
	qtnOfQuestion: number;
	qtnUsers: number;
	testMediaFiles: MediaFileOutputDTO[] | undefined;
	// creatorId: number;
	// creatorName: string;
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
	};
	department: {
		departmentId: number;
		departmentName: string;
	};
	chapter: ChapterOutputDTO;
	testCreator: {
		id: number;
		creatorName: string;
	};
}
