import { MediaFileToTestInputDTO } from '../../mediaFiles/dto/mediaFile.input.dto';

export class CreateQuestionInputDTO {
	titleOfQuestion: string;
	explanationText: string;
	testId: number;
	weight: number;
	oneAnswer: boolean;
	answerType: string;
	questionMediaFiles: MediaFileToTestInputDTO[];
}
