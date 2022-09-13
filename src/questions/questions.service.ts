import { AnswerModel, MediaFileModel, QuestionModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { MediaFileOutputDTO } from '../mediaFiles/dto/mediaFile.output.dto';
import { MediaFileToQuestion } from '../mediaFiles/mediaFile.entity';
import { MediaFilesRepository } from '../mediaFiles/mediaFiles.repository';
import { TestsRepository } from '../tests.folder/tests.repository';
import { TYPES } from '../types';
import { CreateQuestionInputDTO } from './dto/createQuestion.input.dto';
import { CreateQuestionOutputDTO } from './dto/createQuestion.output.dto';
import { QuestionInputDTO } from './dto/question.input.dto';
import { QuestionOutputDTO } from './dto/question.output.dto';
import { Question } from './question.entity';
import { QuestionsRepository } from './questions.repository';
import { IQuestionsService } from './questions.service.interface';

@injectable()
export class QuestionsService implements IQuestionsService {
	constructor(
		@inject(TYPES.QuestionsRepository) private questionsRepository: QuestionsRepository,
		@inject(TYPES.MediaFilesRepository) private mediaFilesRepository: MediaFilesRepository,
		@inject(TYPES.TestsRepository) private testsRepository: TestsRepository,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async createQuestion({
		titleOfQuestion,
		testId,
		weight,
		oneAnswer,
		answerType,
		questionMediaFiles,
		explanationText,
	}: CreateQuestionInputDTO): Promise<CreateQuestionOutputDTO | undefined> {
		const newQuestion = new Question(
			titleOfQuestion,
			testId,
			weight,
			oneAnswer,
			answerType,
			explanationText,
		);
		const result = await this.questionsRepository.create(newQuestion.question);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[QuestionsService]: Error addQuestions: ${err.message}`);
			return undefined;
		}
		const newMediaFiles = questionMediaFiles.map(
			(item) => new MediaFileToQuestion(item.filename, item.size, item.type, item.url, result.id),
		);
		await this.mediaFilesRepository.createToQuestion(newMediaFiles);
		return await this.preserveOutput(result);
	}

	private async preserveMediaFilesOutput(
		questionId: number,
	): Promise<MediaFileOutputDTO[] | undefined> {
		const mediaFiles = await this.mediaFilesRepository.getByQuestion(questionId);
		if (!mediaFiles) {
			const err = new Error();
			this.loggerService.error(`[TestsService]: Error getTests: ${err.message}`);
			return;
		}
		const res = mediaFiles.map((item) => ({
			id: item.id,
			filename: item.filename,
			size: item.size,
			type: item.type,
			url: item.url,
		}));
		return res;
	}

	private async preserveOutput(
		question: QuestionModel & {
			mediaFile: MediaFileModel[];
			answers: AnswerModel[];
		},
	): Promise<QuestionOutputDTO> {
		const mediaFiles = await this.preserveMediaFilesOutput(question.id);
		return {
			id: question.id,
			titleOfQuestion: question.questionText,
			explanationText: question.explanationText,
			weight: question.weight,
			oneAnswer: question.oneAnswer,
			answerType: question.answerType,
			answers: question.answers,
			mediaFile: mediaFiles,
		};
	}

	async getQuestions(testId: number): Promise<QuestionOutputDTO[] | undefined> {
		if (testId) {
			const result = await this.questionsRepository.getByTest(Number(testId));
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[QuestionsService]: Error getQuestions: ${err.message}`);
				return undefined;
			}
			return result.map((item) => ({
				id: item.id,
				titleOfQuestion: item.questionText,
				explanationText: item.explanationText,
				weight: item.weight,
				oneAnswer: item.oneAnswer,
				answerType: item.answerType,
				answers: item.answers,
				mediaFile: item.mediaFile,
			}));
		} else {
			return undefined;
		}
	}

	async deleteQuestion(id: number): Promise<number> {
		const result = await this.questionsRepository.delete(id);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[QuestionsService]: Error getQuestions: ${err.message}`);
		}
		const test = await this.testsRepository.getById(result.testModelId);
		if (test) {
			await this.testsRepository.update(result.testModelId, {
				...test,
				qtnOfQuestion: test.qtnOfQuestion ? +test.qtnOfQuestion : 1,
			});
		}
		return result.id;
	}

	async updateQuestion(
		id: number,
		question: QuestionInputDTO,
	): Promise<CreateQuestionOutputDTO | undefined> {
		const newQuestion = new Question(
			question.titleOfQuestion,
			question.testId,
			question.weight,
			question.oneAnswer,
			question.answerType,
			question.explanationText,
		);
		const result = await this.questionsRepository.update(id, newQuestion.question);
		if (!result) {
			this.loggerService.error(`Error deleting from database: `);
		} else {
			return {
				id: result.id,
				titleOfQuestion: result.questionText,
				explanationText: result.explanationText,
				weight: result.weight,
				oneAnswer: result.oneAnswer,
				answerType: result.answerType,
				mediaFile: result.mediaFile,
				answers: result.answers,
			};
		}
	}
}
