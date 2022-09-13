import { AnswerModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IAnswer } from './answer.entity.interface';
import { IAnswersRepository } from './answers.repository.interface';

@injectable()
export class AnswersRepository implements IAnswersRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}
	async create(answer: IAnswer): Promise<AnswerModel | undefined> {
		try {
			const result = await this.prismaService.client.answerModel.create({
				data: {
					textAnswer: answer.textAnswer,
					answerRight: answer.answerRight,
					questionModelId: answer.questionId,
				},
			});
			return result;
		} catch (err: any) {
			this.loggerService.error(`[AnswersRepository]: Error adding to database: ${err.message}`);
		}
	}

	async getByQuestion(id: number): Promise<AnswerModel[] | undefined> {
		try {
			if (id) {
				return this.prismaService.client.answerModel.findMany({
					where: {
						questionModelId: id,
					},
				});
			} else {
				return undefined;
			}
		} catch (err: any) {
			this.loggerService.error(`[AnswersRepository]: Error reading database: ${err.message}`);
			return undefined;
		}
	}

	async delete(id: number): Promise<number> {
		const result = await this.prismaService.client.answerModel.delete({
			where: {
				id: id,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[AnswersRepository]: Error reading database: ${err.message}`);
		}
		return result.id;
	}

	async update(id: number, answer: IAnswer): Promise<AnswerModel | undefined> {
		try {
			const result = await this.prismaService.client.answerModel.update({
				where: { id },
				data: {
					textAnswer: answer.textAnswer,
					answerRight: answer.answerRight,
					questionModelId: answer.questionId,
				},
			});
			return result;
		} catch (err: any) {
			this.loggerService.error(`[AnswersRepository]: Error updating to database: ${err.message}`);
		}
	}
}
