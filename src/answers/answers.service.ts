import { AnswerModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { AnswerInputDTO } from './dto/answer.input.dto';
import { AnswerOutputDTO } from './dto/answer.output.dto';
import { Answer } from './answer.entity';
import { AnswersRepository } from './answers.repository';
import { IAnswersService } from './answers.service.interface';

@injectable()
export class AnswersService implements IAnswersService {
	constructor(
		@inject(TYPES.AnswersRepository) private answersRepository: AnswersRepository,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async createAnswer(answer: AnswerInputDTO): Promise<AnswerOutputDTO | undefined> {
		const newAnswer = new Answer(answer.textAnswer, answer.answerRight, answer.questionId);
		const result = await this.answersRepository.create(newAnswer.answer);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[AnswersService]: Error getAnswers: ${err.message}`);
			return undefined;
		}
		return {
			id: result.id,
			textAnswer: result.textAnswer,
			answerRight: result.answerRight,
		};
	}

	private preserveOutput(result: AnswerModel[]): AnswerOutputDTO[] {
		return result?.map((item) => {
			return {
				id: item.id,
				textAnswer: item.textAnswer,
				answerRight: item.answerRight,
			};
		});
	}

	async getAnswers(questionId: number): Promise<AnswerOutputDTO[] | undefined> {
		if (questionId) {
			const result = await this.answersRepository.getByQuestion(questionId);
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[AnswersService]: Error getAnswers: ${err.message}`);
				return undefined;
			}
			return this.preserveOutput(result);
		} else {
			return undefined;
		}
	}

	async delAnswer(answerId: number): Promise<number | undefined> {
		const result = await this.answersRepository.delete(answerId);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[AnswersService]: Error getAnswers: ${err.message}`);
			return undefined;
		}
		return result;
	}

	async updateAnswer(id: number, answer: AnswerInputDTO): Promise<AnswerOutputDTO | undefined> {
		const newAnswer = new Answer(answer.textAnswer, answer.answerRight, answer.questionId);
		const result = await this.answersRepository.update(id, newAnswer.answer);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[AnswersService]: Error getAnswers: ${err.message}`);
			return undefined;
		}
		return {
			id: result.id,
			textAnswer: result.textAnswer,
			answerRight: result.answerRight,
		};
	}
}
