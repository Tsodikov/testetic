import { Answer } from './answer.entity';
import { AnswerInputDTO } from './dto/answer.input.dto';
import { AnswerOutputDTO } from './dto/answer.output.dto';

export interface IAnswersService {
	createAnswer: (answer: AnswerInputDTO) => Promise<AnswerOutputDTO | undefined>;
	getAnswers: (questionId: number) => Promise<AnswerOutputDTO[] | undefined>;
	delAnswer: (answerId: number) => Promise<number | undefined>;
}
