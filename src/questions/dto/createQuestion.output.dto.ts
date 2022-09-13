import { AnswerOutputDTO } from '../../answers/dto/answer.output.dto';
import { MediaFileOutputDTO } from '../../mediaFiles/dto/mediaFile.output.dto';

export class CreateQuestionOutputDTO {
	id: number;
	titleOfQuestion: string;
	explanationText: string | null;
	weight: number;
	oneAnswer: boolean;
	answerType: string | null;
	mediaFile: MediaFileOutputDTO[] | undefined;
	answers: AnswerOutputDTO[] | undefined;
}
