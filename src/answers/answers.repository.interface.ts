import { AnswerModel } from '@prisma/client';
import { IAnswer } from './answer.entity.interface';

export interface IAnswersRepository {
	create: (answer: IAnswer) => Promise<AnswerModel | undefined>;
	getByQuestion: (id: number) => Promise<AnswerModel[] | undefined>;
	delete: (id: number) => Promise<number>;
}
