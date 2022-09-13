import {
	AnswerModel,
	MediaFileModel,
	QuestionModel,
	QuestionSessionModel,
	TestModel,
	TestSessionModel,
	UserModel,
} from '@prisma/client';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { InputQuestionSessionDTO } from './dto/inputQuestionSession.dto';
import { InputTestSessionDTO } from './dto/inputTestSession.dto';
import { OutputQuestionSessionDTO } from './dto/outputQuestionSession.dto';
import { OutputTestSessionDTO } from './dto/outputTestSession.dto';
import { OutputTestSessionTestDTO } from './dto/outputTestSessionTest.dto';
import { OutputTestSessionUserDTO } from './dto/outputTestSessionUser.dto';
import { TestSessionRepository } from './testSession.repository';
import { ITestSessionService } from './testSession.service.interface';

@injectable()
export class TestSessionService implements ITestSessionService {
	constructor(
		@inject(TYPES.TestSessionRepository) private testSessionRepository: TestSessionRepository,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	private preserveTestSessionOutputWithTest(
		testSession: TestSessionModel & {
			test: TestModel & {
				organization: {
					name: string;
					id: number;
				};
				testMediaFiles: MediaFileModel[];
				testCreator: UserModel;
			};
			questionSession?: QuestionSessionModel[];
		},
	): OutputTestSessionTestDTO {
		return {
			id: testSession.id,
			testId: testSession.testId,
			userId: testSession.userId,
			registrationDateTime: testSession.registrationDateTime,
			confirmationRegister: testSession.confirmationRegister,
			invitationSended: testSession.invitationSended,
			confirmationInvite: testSession.confirmationInvite,
			startTest: testSession.startTest,
			endTest: testSession.endTest,
			status: testSession.status,
			test: {
				id: testSession.test.id,
				title: testSession.test.title,
				description: testSession.test.description,
				dateOfCreate: testSession.test.dateOfCreate,
				readyToUse: testSession.test.readyToUse,
				qtnOfQuestion: testSession.test.qtnOfQuestion,
				qtnUsers: testSession.test.qtnUsers,
				testMediaFiles: testSession.test.testMediaFiles,
				creatorId: testSession.test.testCreator.id,
				creatorName: testSession.test.testCreator.name,
				timeLimitPassTest: testSession.test.timeLimitPassTest,
				timeLimit: testSession.test.timeLimit,
				preRegistration: testSession.test.preRegistration,
				startAnyTime: testSession.test.startAnyTime,
				currentActiveStart: testSession.test.currentActiveStart,
				currentActiveEnd: testSession.test.currentActiveEnd,
				backToAnyQuestion: testSession.test.backToAnyQuestion,
				showResultQuestion: testSession.test.showResultQuestion,
				showResultTest: testSession.test.showResultTest,
				organization: {
					organizationId: testSession.test.organization.id,
					organizationName: testSession.test.organization.name,
				},
				department: {
					departmentId: testSession.test.departmentId,
				},
				chapter: {
					chapterId: testSession.test.chapterId,
					chapterTitle: testSession.test.chapterTitle,
				},
			},
			questionSession: testSession.questionSession ? testSession.questionSession : null,
		};
	}

	private preserveOutputQuestionSesssion(
		questionSession: QuestionSessionModel & {
			testSession: TestSessionModel;
			question: QuestionModel;
			choiceAnswers: AnswerModel[];
		},
	): OutputQuestionSessionDTO {
		return {
			id: questionSession.id,
			startQuestion: questionSession.startQuestion,
			endQuestion: questionSession.endQuestion,
			result: questionSession.result,
			choiceAnswers: questionSession.choiceAnswers,
			question: questionSession.question,
			testSession: questionSession.testSession,
		};
	}

	async createTestSession(testSession: InputTestSessionDTO): Promise<OutputTestSessionTestDTO> {
		const result = await this.testSessionRepository.create(testSession);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionService] Error creating test session ${err.message}`);
		}
		return this.preserveTestSessionOutputWithTest(result);
	}

	async getByUserTestId(userId: number, testId: number): Promise<OutputTestSessionDTO | null> {
		const result = await this.testSessionRepository.findByUserTestId(userId, testId);
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[TestSessionService] Test session for this user was't creted ${err.message}`,
			);
			return result;
		}
		return result;
	}

	async getByTestId(testId: number): Promise<OutputTestSessionUserDTO[] | null> {
		const result = await this.testSessionRepository.findByTestId(testId);
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[TestSessionService] Test session for this user was't creted ${err.message}`,
			);
			return null;
		}
		return result.map((item) => ({
			id: item.id,
			testId: item.testId,
			userId: item.userId,
			registrationDateTime: item.registrationDateTime,
			confirmationRegister: item.confirmationRegister,
			invitationSended: item.invitationSended,
			confirmationInvite: item.confirmationInvite,
			startTest: item.startTest,
			endTest: item.endTest,
			status: item.status,
			user: {
				id: item.user.id,
				email: item.user.email,
				firstName: item.user.firstName,
				lastName: item.user.lastName,
				name: item.user.name,
				active: item.user.active,
				role: item.user.role,
			},
		}));
	}

	async getByUserId(userId: number, status: string): Promise<OutputTestSessionTestDTO[] | null> {
		const result = await this.testSessionRepository.findByUserId(userId, !status ? 'all' : status);
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[TestSessionService] Test session for this user was't creted ${err.message}`,
			);
			return null;
		}
		return result.map((item) => this.preserveTestSessionOutputWithTest(item));
	}

	async updateTestSession(
		id: number,
		testSession: InputTestSessionDTO,
	): Promise<OutputTestSessionTestDTO | null> {
		// console.log(testSession);
		const result = await this.testSessionRepository.update(id, testSession);
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[TestSessionService] Test session for this user was't creted ${err.message}`,
			);
			return result;
		}
		return this.preserveTestSessionOutputWithTest(result);
	}

	async createQuestionSession(
		questionSession: InputQuestionSessionDTO,
	): Promise<OutputQuestionSessionDTO> {
		const result = await this.testSessionRepository.createQuestionSession(questionSession);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionService] Error creating test session ${err.message}`);
		}
		return this.preserveOutputQuestionSesssion(result);
	}

	async updateQuestionSession(
		id: number,
		questionSession: InputQuestionSessionDTO,
	): Promise<OutputQuestionSessionDTO | null> {
		const result = await this.testSessionRepository.updateQuestionSession(id, questionSession);
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[TestSessionService] Test session for this user was't creted ${err.message}`,
			);
			return result;
		}
		return this.preserveOutputQuestionSesssion(result);
	}

	async getQSbyTSId(tSId: number): Promise<OutputQuestionSessionDTO[] | null> {
		const result = await this.testSessionRepository.findQSbyTSId(tSId);
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[TestSessionService] Test session for this user was't creted ${err.message}`,
			);
			return null;
		}
		return result.map((item) => this.preserveOutputQuestionSesssion(item));
	}
}
