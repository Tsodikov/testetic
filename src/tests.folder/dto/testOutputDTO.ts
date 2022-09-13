import { ChapterOutputDTO } from '../../chapters/dto/chapter.output.dto';
import { MediaFileOutputDTO } from '../../mediaFiles/dto/mediaFile.output.dto';

export class TestOutputDTO {
	id: number;
	title: string;
	description: string;
	dateOfCreate: Date;
	readyToUse: boolean;
	qtnOfQuestion: number;
	qtnUsers: number;
	testMediaFiles: MediaFileOutputDTO[] | undefined;
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
		organizationTitle: string;
	};
	department: {
		departmentId: number;
		departmentTitle: string;
	};
	testCreator: {
		id: number;
		creatorName: string;
	};
	chapter: ChapterOutputDTO;

	// questions: {
	// 	id: number;
	// 	questionText: string;
	// 	weight: number;
	// 	mediaFile: MediaFileOutputDTO[] | undefined;
	// 	answers
	// };
}
