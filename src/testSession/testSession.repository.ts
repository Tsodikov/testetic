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
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { InputQuestionSessionDTO } from './dto/inputQuestionSession.dto';
import { InputTestSessionDTO } from './dto/inputTestSession.dto';
import { OutputQuestionSessionDTO } from './dto/outputQuestionSession.dto';
import { ITestSessionRepository } from './testSession.repository.interface';

@injectable()
export class TestSessionRepository implements ITestSessionRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async create(testSession: InputTestSessionDTO): Promise<
		TestSessionModel & {
			test: TestModel & {
				organization: {
					name: string;
					id: number;
				};
				testMediaFiles: MediaFileModel[];
				testCreator: UserModel;
			};
		}
	> {
		// console.log(testSession);
		const result = await this.prismaService.client.testSessionModel.create({
			data: {
				testId: testSession.testId,
				userId: testSession.userId,
				registrationDateTime: testSession.registrationDateTime,
				confirmationRegister: testSession.confirmationRegister,
				invitationSended: testSession.invitationSended,
				confirmationInvite: testSession.confirmationInvite,
				startTest: testSession.startTest,
				endTest: testSession.endTest,
				status: testSession.status,
			},
			include: {
				test: {
					include: {
						testCreator: true,
						organization: {
							select: {
								id: true,
								name: true,
							},
						},
						testMediaFiles: true,
					},
				},
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionService] Error creating test session ${err.message}`);
		}
		return result;
	}

	async findByUserTestId(userId: number, testId: number): Promise<TestSessionModel | null> {
		const result = await this.prismaService.client.testSessionModel.findFirst({
			where: {
				userId: userId,
				testId: testId,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[TestSessionService] Test session for this user wasn't created ${err.message}`,
			);
			return null;
		}
		return result;
	}

	async findByTestId(testId: number): Promise<
		| (TestSessionModel & {
				user: UserModel;
		  })[]
		| null
	> {
		const result = await this.prismaService.client.testSessionModel.findMany({
			where: {
				testId: testId,
			},
			include: {
				user: true,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[TestSessionService] Test session for this user wasn't created ${err.message}`,
			);
			return null;
		}
		return result;
	}

	async findByUserId(
		userId: number,
		status: string,
	): Promise<
		| (TestSessionModel & {
				test: TestModel & {
					organization: {
						name: string;
						id: number;
					};
					testMediaFiles: MediaFileModel[];
					testCreator: UserModel;
				};
				quetionSession?: QuestionSessionModel[];
		  })[]
		| null
	> {
		let result: (TestSessionModel & {
			test: TestModel & {
				testCreator: UserModel;
				testMediaFiles: MediaFileModel[];
				organization: {
					id: number;
					name: string;
				};
				quetionSession?: QuestionSessionModel[];
			};
		})[];
		try {
			if (status === 'all') {
				result = await this.prismaService.client.testSessionModel.findMany({
					where: {
						userId: userId,
					},
					include: {
						test: {
							include: {
								testCreator: true,
								organization: {
									select: {
										id: true,
										name: true,
									},
								},
								testMediaFiles: true,
							},
						},
						quetionSession: true,
					},
				});
			} else {
				result = await this.prismaService.client.testSessionModel.findMany({
					where: {
						userId: userId,
						status: status,
					},
					include: {
						test: {
							include: {
								testCreator: true,
								organization: {
									select: {
										id: true,
										name: true,
									},
								},
								testMediaFiles: true,
							},
						},
						quetionSession: true,
					},
				});
			}

			if (!result) {
				const err = new Error();
				this.loggerService.error(
					`[TestSessionService] Test session for this user wasn't created ${err.message}`,
				);
				return null;
			}
			return result;
		} catch (err: any) {
			this.loggerService.error(
				`[TestSessionService] Test session for this user wasn't created ${err.message}`,
			);
			return null;
		}
	}

	async update(
		id: number,
		testSession: InputTestSessionDTO,
	): Promise<
		TestSessionModel & {
			test: TestModel & {
				testCreator: UserModel;
				testMediaFiles: MediaFileModel[];
				organization: {
					id: number;
					name: string;
				};
			};
		}
	> {
		const result = await this.prismaService.client.testSessionModel.update({
			where: {
				id,
			},
			data: {
				testId: testSession.testId,
				userId: testSession.userId,
				registrationDateTime: testSession.registrationDateTime,
				confirmationRegister: testSession.confirmationRegister,
				invitationSended: testSession.invitationSended,
				confirmationInvite: testSession.confirmationInvite,
				startTest: testSession.startTest,
				endTest: testSession.endTest,
				status: testSession.status,
			},
			include: {
				test: {
					include: {
						testCreator: true,
						organization: {
							select: {
								id: true,
								name: true,
							},
						},
						testMediaFiles: true,
					},
				},
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionService] Error creating test session ${err.message}`);
		}
		return result;
	}

	async createQuestionSession(questionSession: InputQuestionSessionDTO): Promise<
		QuestionSessionModel & {
			testSession: TestSessionModel;
			question: QuestionModel;
			choiceAnswers: AnswerModel[];
		}
	> {
		const answersArray = questionSession.choiceAnswerId.map((item) => {
			return { id: item };
		});
		const result = await this.prismaService.client.questionSessionModel.create({
			data: {
				startQuestion: questionSession.startQuestion,
				endQuestion: questionSession.endQuestion,
				result: questionSession.result,
				choiceAnswers: {
					connect: answersArray,
					// questionSession.choiceAnswerId.map((item) => ({ id: item })),
				},
				testSessionId: questionSession.testSessionId,
				questionId: questionSession.questionId,
			},
			include: {
				question: true,
				testSession: true,
				choiceAnswers: true,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionService] Error creating test session ${err.message}`);
		}
		return result;
	}

	async updateQuestionSession(
		id: number,
		questionSession: InputQuestionSessionDTO,
	): Promise<
		QuestionSessionModel & {
			testSession: TestSessionModel;
			question: QuestionModel;
			choiceAnswers: AnswerModel[];
		}
	> {
		const answersArray = questionSession.choiceAnswerId.map((item) => {
			return { id: item };
		});
		const result = await this.prismaService.client.questionSessionModel.update({
			where: {
				id,
			},
			data: {
				startQuestion: questionSession.startQuestion,
				endQuestion: questionSession.endQuestion,
				result: questionSession.result,
				choiceAnswers: {
					connect: answersArray,
					// questionSession.choiceAnswerId.map((item) => ({ id: item })),
				},
				testSessionId: questionSession.testSessionId,
				questionId: questionSession.questionId,
			},
			include: {
				question: true,
				testSession: true,
				choiceAnswers: true,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestSessionService] Error creating test session ${err.message}`);
		}
		return result;
	}

	async findQSbyTSId(tSId: number): Promise<
		| (QuestionSessionModel & {
				testSession: TestSessionModel;
				question: QuestionModel;
				choiceAnswers: AnswerModel[];
		  })[]
		| null
	> {
		try {
			const result = await this.prismaService.client.questionSessionModel.findMany({
				where: {
					testSessionId: tSId,
				},
				include: {
					question: true,
					testSession: true,
					choiceAnswers: true,
				},
			});
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[TestSessionService] Error creating test session ${err.message}`);
				return null;
			}
			return result;
		} catch (err: any) {
			this.loggerService.error(`[TestSessionService] Error creating test session ${err.message}`);
			return null;
		}
	}
}
