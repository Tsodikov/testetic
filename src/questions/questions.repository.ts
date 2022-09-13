import { AnswerModel, MediaFileModel, QuestionModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IQuestion } from './question.entity.interface';
import { IQuestionsRepository } from './questions.repository.interface';

@injectable()
export class QuestionsRepository implements IQuestionsRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async create(question: IQuestion): Promise<
		| (QuestionModel & {
				mediaFile: MediaFileModel[];
				answers: AnswerModel[];
		  })
		| undefined
	> {
		const result = await this.prismaService.client.questionModel.create({
			data: {
				questionText: question.questionText,
				explanationText: question.explanationText,
				weight: question.weight,
				testModelId: question.testId,
				oneAnswer: question.oneAnswer,
				answerType: question.answerType,
			},
			include: {
				mediaFile: true,
				answers: true,
			},
		});
		return result;
	}

	async getByTest(id: number): Promise<
		| (QuestionModel & {
				mediaFile: MediaFileModel[];
				answers: AnswerModel[];
		  })[]
		| undefined
	> {
		try {
			if (id) {
				const result = this.prismaService.client.questionModel.findMany({
					where: {
						testModelId: id,
					},
					include: {
						answers: true,
						mediaFile: true,
					},
				});
				return result;
			} else {
				return undefined;
			}
		} catch (err: any) {
			this.loggerService.error(`[QuestionsRepository]: Error reading database: ${err.message}`);
			return undefined;
		}
	}

	async delete(id: number): Promise<QuestionModel> {
		const result = await this.prismaService.client.questionModel.delete({
			where: {
				id: id,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[QuestionsRepository]: Error deleting: ${err.message}`);
		}
		return result;
	}

	async update(
		id: number,
		question: IQuestion,
	): Promise<
		| (QuestionModel & {
				mediaFile: MediaFileModel[];
				answers: AnswerModel[];
		  })
		| undefined
	> {
		try {
			const result = await this.prismaService.client.questionModel.update({
				where: { id },
				data: {
					questionText: question.questionText,
					explanationText: question.explanationText,
					weight: question.weight,
					testModelId: question.testId,
					oneAnswer: question.oneAnswer,
					answerType: question.answerType,
				},
				include: {
					mediaFile: true,
					answers: true,
				},
			});
			return result;
		} catch (err: any) {
			this.loggerService.error(`Error adding to database: ${err.message}`);
		}
	}
}
