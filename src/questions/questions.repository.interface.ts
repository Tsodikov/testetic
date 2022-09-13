import { AnswerModel, MediaFileModel, QuestionModel } from '@prisma/client';
import { IQuestion } from './question.entity.interface';

export interface IQuestionsRepository {
	create: (question: IQuestion) => Promise<
		| (QuestionModel & {
				mediaFile: MediaFileModel[];
				answers: AnswerModel[];
		  })
		| undefined
	>;
	delete: (id: number) => Promise<QuestionModel>;
	update: (
		id: number,
		question: IQuestion,
	) => Promise<
		| (QuestionModel & {
				mediaFile: MediaFileModel[];
				answers: AnswerModel[];
		  })
		| undefined
	>;
	getByTest: (id: number) => Promise<
		| (QuestionModel & {
				mediaFile: MediaFileModel[];
				answers: AnswerModel[];
		  })[]
		| undefined
	>;
}
