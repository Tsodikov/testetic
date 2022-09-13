import { AnswerModel } from '@prisma/client';

export class OutputQuestionSessionDTO {
	id: number;
	startQuestion: Date;
	endQuestion: Date;
	result: boolean;
	choiceAnswers: AnswerModel[];
	question: {};
	testSession: {};
}
