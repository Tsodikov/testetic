import {
	ChapterModel,
	DepartmentModel,
	MediaFileModel,
	QuestionModel,
	TestModel,
} from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { CreateTestInputDTO } from './dto/createTest.input.dto';
import { ITest } from './test.entity.interface';
import { ITestsRepository } from './tests.repository.interface';

@injectable()
export class TestsRepository implements ITestsRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}
	async create(test: CreateTestInputDTO): Promise<
		| (TestModel & {
				questions: QuestionModel[];
				testMediaFiles: MediaFileModel[];
				department: DepartmentModel;
				chapter: ChapterModel;
				organization: {
					id: number;
					name: string;
				};
		  })
		| undefined
	> {
		try {
			const result = await this.prismaService.client.testModel.create({
				data: {
					title: test.title,
					description: test.description,
					dateOfCreate: test.dateOfCreate,
					readyToUse: test.readyToUse,
					qtnOfQuestion: test.qtnOfQuestion,
					qtnUsers: test.qtnUsers,
					creatorId: test.creatorId,
					creatorName: test.creatorName,
					timeLimitPassTest: test.timeLimitPassTest,
					timeLimit: test.timeLimit,
					preRegistration: test.preRegistration,
					startAnyTime: test.startAnyTime,
					currentActiveStart: test.currentActiveStart,
					currentActiveEnd: test.currentActiveEnd,
					backToAnyQuestion: test.backToAnyQuestion,
					showResultQuestion: test.showResultQuestion,
					showResultTest: test.showResultTest,
					chapterId: test.chapterId,
					chapterTitle: test.chapterTitle,
					organizationId: test.organizationId,
					departmentId: test.departmentId,
				},
				include: {
					organization: {
						select: {
							id: true,
							name: true,
						},
					},
					testMediaFiles: true,
					questions: true,
					department: true,
					chapter: true,
				},
			});
			if (!result) {
				const err = new Error();
				this.loggerService.error(`Error adding to database: ${err.message}`);
				return undefined;
			}
			return result;
		} catch (err: any) {
			this.loggerService.error(`Error adding to database: ${err.message}`);
		}
	}

	async getByChapter(id: number): Promise<
		(TestModel & {
			testMediaFiles: MediaFileModel[];
			organization: {
				id: number;
				name: string;
			};
			department: DepartmentModel;
			questions: QuestionModel[];
			chapter: ChapterModel;
		})[]
	> {
		const result = this.prismaService.client.testModel.findMany({
			where: {
				chapterId: id,
			},
			include: {
				questions: true,
				organization: {
					select: {
						id: true,
						name: true,
					},
				},
				testMediaFiles: true,
				department: true,
				chapter: true,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`Error reading database: ${err.message}`);
		}
		return result;
	}

	async getById(id: number): Promise<
		| (TestModel & {
				questions: QuestionModel[];
				testMediaFiles: MediaFileModel[];
				department: DepartmentModel;
				chapter: ChapterModel;
				organization: {
					id: number;
					name: string;
				};
		  })
		| null
	> {
		try {
			const result = this.prismaService.client.testModel.findFirst({
				where: {
					id: id,
				},
				include: {
					organization: {
						select: {
							id: true,
							name: true,
						},
					},
					testMediaFiles: true,
					questions: true,
					department: true,
					chapter: true,
				},
			});
			if (!result) {
				const err = new Error();
				this.loggerService.error(`Error reading database: ${err.message}`);
				return null;
			}
			return result;
		} catch (err: any) {
			this.loggerService.error(`Error reading database: ${err.message}`);
			return null;
		}
	}

	async findByOrgUser(
		orgId: number,
		userId: number,
	): Promise<
		| (TestModel & {
				testMediaFiles: MediaFileModel[];
				organization: {
					id: number;
					name: string;
				};
				department: DepartmentModel;
				questions: QuestionModel[];
				chapter: ChapterModel;
		  })[]
		| null
	> {
		try {
			if (orgId && userId) {
				const result = this.prismaService.client.testModel.findMany({
					where: {
						creatorId: userId,
					},
					include: {
						questions: true,
						organization: {
							select: {
								id: true,
								name: true,
							},
						},
						testMediaFiles: true,
						department: true,
						chapter: true,
					},
				});
				return result;
			} else {
				return null;
			}
		} catch (err: any) {
			this.loggerService.error(`Error reading database: ${err.message}`);
			return null;
		}
	}

	async findByOrg(orgId: number): Promise<
		| (TestModel & {
				testMediaFiles: MediaFileModel[];
				organization: {
					id: number;
					name: string;
				};
				chapter: ChapterModel;
				department: DepartmentModel;
				questions: QuestionModel[];
		  })[]
		| null
	> {
		try {
			if (orgId) {
				const result = this.prismaService.client.testModel.findMany({
					where: {
						organizationId: orgId,
					},
					include: {
						questions: true,
						organization: {
							select: {
								id: true,
								name: true,
							},
						},
						chapter: true,
						testMediaFiles: true,
						department: true,
					},
				});
				return result;
			} else {
				return null;
			}
		} catch (err: any) {
			this.loggerService.error(`Error reading database: ${err.message}`);
			return null;
		}
	}

	async findByDep(depId: number): Promise<
		| (TestModel & {
				testMediaFiles: MediaFileModel[];
				organization: {
					id: number;
					name: string;
				};
				chapter: ChapterModel;
				department: DepartmentModel;
				questions: QuestionModel[];
		  })[]
		| null
	> {
		try {
			if (depId) {
				const result = this.prismaService.client.testModel.findMany({
					where: {
						departmentId: depId,
					},
					include: {
						questions: true,
						organization: {
							select: {
								id: true,
								name: true,
							},
						},
						chapter: true,
						testMediaFiles: true,
						department: true,
					},
				});
				return result;
			} else {
				return null;
			}
		} catch (err: any) {
			this.loggerService.error(`Error reading database: ${err.message}`);
			return null;
		}
	}

	async delete(id: number): Promise<TestModel | null> {
		return await this.prismaService.client.testModel.delete({
			where: {
				id: id,
			},
		});
	}

	async update(
		id: number,
		test: ITest,
	): Promise<
		| (TestModel & {
				testMediaFiles: MediaFileModel[];
				organization: {
					id: number;
					name: string;
				};
				department: DepartmentModel;
				questions: QuestionModel[];
				chapter: ChapterModel;
		  })
		| undefined
	> {
		try {
			const result = await this.prismaService.client.testModel.update({
				where: { id },
				data: {
					title: test.title,
					description: test.description,
					dateOfCreate: test.dateOfCreate,
					readyToUse: test.readyToUse,
					qtnOfQuestion: test.qtnOfQuestion,
					qtnUsers: test.qtnUsers,
					creatorId: test.creatorId,
					creatorName: test.creatorName,
					timeLimitPassTest: test.timeLimitPassTest,
					timeLimit: test.timeLimit,
					preRegistration: test.preRegistration,
					startAnyTime: test.startAnyTime,
					currentActiveStart: test.currentActiveStart,
					currentActiveEnd: test.currentActiveEnd,
					backToAnyQuestion: test.backToAnyQuestion,
					showResultQuestion: test.showResultQuestion,
					showResultTest: test.showResultTest,
					chapterId: test.chapterId,
					chapterTitle: test.chapterTitle,
					organizationId: test.organizationId,
					departmentId: test.departmentId,
				},
				include: {
					questions: true,
					organization: {
						select: {
							id: true,
							name: true,
						},
					},
					testMediaFiles: true,
					department: true,
					chapter: true,
				},
			});
			return result;
		} catch (err: any) {
			this.loggerService.error(`Error adding to database: ${err.message}`);
		}
	}
}
