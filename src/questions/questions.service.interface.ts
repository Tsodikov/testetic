import { CreateQuestionInputDTO } from './dto/createQuestion.input.dto';
import { CreateQuestionOutputDTO } from './dto/createQuestion.output.dto';
import { QuestionInputDTO } from './dto/question.input.dto';
import { QuestionOutputDTO } from './dto/question.output.dto';

export interface IQuestionsService {
	createQuestion: (
		question: CreateQuestionInputDTO,
	) => Promise<CreateQuestionOutputDTO | undefined>;
	getQuestions: (testId: number) => Promise<QuestionOutputDTO[] | undefined>;
	deleteQuestion: (id: number) => Promise<number>;
	updateQuestion: (
		id: number,
		question: QuestionInputDTO,
	) => Promise<CreateQuestionOutputDTO | undefined>;
}
