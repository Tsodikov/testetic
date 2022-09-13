import {
	ChapterModel,
	DepartmentModel,
	MediaFileModel,
	QuestionModel,
	TestModel,
} from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ChaptersRepository } from '../chapters/chapters.repository';
import { ILogger } from '../logger/logger.interface';
import { MediaFileOutputDTO } from '../mediaFiles/dto/mediaFile.output.dto';
import { MediaFileToTest } from '../mediaFiles/mediaFile.entity';
import { MediaFilesRepository } from '../mediaFiles/mediaFiles.repository';
import { OrganizationRepository } from '../organizations/organizations.repository';
import { TYPES } from '../types';
import { CreateTestInputDTO } from './dto/createTest.input.dto';
import { GetTestDTO } from './dto/getTestDTO';
import { TestCreateOutputDTO } from './dto/testCreateOutputDTO';
import { TestOutputDTO } from './dto/testOutputDTO';
import { TestsRepository } from './tests.repository';
import { ITestsService } from './tests.service.interface';

@injectable()
export class TestsService implements ITestsService {
	constructor(
		@inject(TYPES.TestsRepository) private testsRepository: TestsRepository,
		@inject(TYPES.MediaFilesRepository) private mediaFilesRepository: MediaFilesRepository,
		@inject(TYPES.OrganizationRepository) private organizationsRepository: OrganizationRepository,
		@inject(TYPES.ChaptersRepository) private chaptersRepository: ChaptersRepository,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async createTest(test: CreateTestInputDTO): Promise<TestCreateOutputDTO | null> {
		const result = await this.testsRepository.create(test);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[TestsService]: Error adding test: ${err.message}`);
			return null;
		}
		const newMediaFiles = test.testMediaFiles.map(
			(item) => new MediaFileToTest(item.filename, item.size, item.type, item.url, result.id),
		);
		await this.mediaFilesRepository.createToTest(newMediaFiles);
		return this.preserveCreateOutput(result);
	}

	async getTests(chapterId: number): Promise<TestOutputDTO[] | undefined> {
		if (chapterId) {
			const result = await this.testsRepository.getByChapter(Number(chapterId));
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[TestsService]: Error getTests: ${err.message}`);
				return undefined;
			}
			return result.map((item) => this.preserveOutput(item));
		} else {
			return undefined;
		}
	}

	async getTestById(testId: number): Promise<TestOutputDTO | null> {
		if (testId) {
			const result = await this.testsRepository.getById(testId);
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[TestsService]: Error getTests: ${err.message}`);
				return null;
			}
			return this.preserveOutput(result);
		} else {
			return null;
		}
	}

	async getTestsByOrgUser(orgId: number, userId: number): Promise<TestOutputDTO[] | undefined> {
		if (orgId) {
			const result = await this.testsRepository.findByOrgUser(orgId, userId);
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[TestsService]: Error getTests: ${err.message}`);
				return undefined;
			}
			return result.map((item) => this.preserveOutput(item));
		} else {
			return undefined;
		}
	}

	async getTestsByOrg(orgId: number): Promise<TestOutputDTO[] | undefined> {
		if (orgId) {
			const result = await this.testsRepository.findByOrg(orgId);
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[TestsService]: Error getTests: ${err.message}`);
				return undefined;
			}
			return result.map((item) => this.preserveOutput(item));
		} else {
			return undefined;
		}
	}

	async getTestsByDep(depId: number): Promise<TestOutputDTO[] | undefined> {
		if (depId) {
			const result = await this.testsRepository.findByOrg(depId);
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[TestsService]: Error getTests: ${err.message}`);
				return undefined;
			}
			return result.map((item) => this.preserveOutput(item));
		} else {
			return undefined;
		}
	}

	async deleteTest(testId: number): Promise<TestModel | null> {
		const resDelTest = await this.testsRepository.delete(testId);
		await this.mediaFilesRepository.deleteAllFromTest(testId);
		if (!resDelTest) {
			return null;
		}
		return resDelTest;
	}

	async updateTest(id: number, test: CreateTestInputDTO): Promise<TestOutputDTO | undefined> {
		const result = await this.testsRepository.update(id, test);
		if (!result) {
			this.loggerService.error(`Error deleting from database: `);
		} else {
			return this.preserveOutput(result);
		}
	}

	private async preserveMediaFilesOutput(
		testId: number,
	): Promise<MediaFileOutputDTO[] | undefined> {
		const mediaFiles = await this.mediaFilesRepository.getByTest(testId);
		if (!mediaFiles) {
			const err = new Error();
			this.loggerService.error(`[TestsService]: Error getTests: ${err.message}`);
			return;
		}
		return mediaFiles.map((item) => ({
			id: item.id,
			filename: item.filename,
			size: item.size,
			type: item.type,
			url: item.url,
		}));
	}

	private async preserveCreateOutput(
		result: TestModel & {
			questions: QuestionModel[];
			testMediaFiles: MediaFileModel[];
			department: DepartmentModel;
			chapter: ChapterModel;
			organization: {
				id: number;
				name: string;
			};
		},
	): Promise<TestCreateOutputDTO> {
		const mediaFiles = await this.preserveMediaFilesOutput(result.id);
		return {
			id: result.id,
			title: result.title,
			description: result.description,
			dateOfCreate: result.dateOfCreate,
			readyToUse: result.readyToUse,
			qtnOfQuestion: result.qtnOfQuestion,
			qtnUsers: result.qtnUsers,
			testMediaFiles: mediaFiles,
			// creatorId: result.creatorId,
			// creatorName: result.creatorName,
			timeLimitPassTest: result.timeLimitPassTest,
			timeLimit: result.timeLimit,
			preRegistration: result.preRegistration,
			startAnyTime: result.startAnyTime,
			currentActiveStart: result.currentActiveStart,
			currentActiveEnd: result.currentActiveEnd,
			backToAnyQuestion: result.backToAnyQuestion,
			showResultQuestion: result.showResultQuestion,
			showResultTest: result.showResultTest,
			organization: {
				organizationId: result.organizationId,
			},
			department: {
				departmentId: result.department.id,
				departmentName: result.department.name,
			},
			chapter: {
				id: result.chapter.id,
				chapterTitle: result.chapter.chapterTitle,
				chapterDescription: result.chapter.chapterDescription,
				chapterCreators: {
					id: result.chapter.userModelId,
					name: result.chapter.userModelName,
				},
				dateOfCreate: result.chapter.dateOfCreate,
				qtnTests: result.chapter.qtnTests,
			},
			testCreator: {
				id: result.creatorId,
				creatorName: result.creatorName,
			},
		};
	}

	private preserveOutput(
		result: TestModel & {
			questions: QuestionModel[];
			testMediaFiles: MediaFileModel[];
			department: DepartmentModel;
			chapter: ChapterModel;
			organization: {
				id: number;
				name: string;
			};
		},
	): TestOutputDTO {
		return {
			id: result.id,
			title: result.title,
			description: result.description,
			dateOfCreate: result.dateOfCreate,
			readyToUse: result.readyToUse,
			qtnOfQuestion: result.qtnOfQuestion,
			qtnUsers: result.qtnUsers,
			testMediaFiles: result.testMediaFiles,
			timeLimitPassTest: result.timeLimitPassTest,
			timeLimit: result.timeLimit,
			preRegistration: result.preRegistration,
			startAnyTime: result.startAnyTime,
			currentActiveStart: result.currentActiveStart,
			currentActiveEnd: result.currentActiveEnd,
			backToAnyQuestion: result.backToAnyQuestion,
			showResultQuestion: result.showResultQuestion,
			showResultTest: result.showResultTest,
			organization: {
				organizationId: result.organization.id,
				organizationTitle: result.organization.name,
			},
			department: {
				departmentId: result.department.id,
				departmentTitle: result.department.name,
			},
			testCreator: {
				id: result.creatorId,
				creatorName: result.creatorName,
			},
			chapter: {
				id: result.chapter.id,
				chapterTitle: result.chapter.chapterTitle,
				chapterDescription: result.chapter.chapterDescription,
				chapterCreators: {
					id: result.chapter.userModelId,
					name: result.chapter.userModelName,
				},
				dateOfCreate: result.chapter.dateOfCreate,
				qtnTests: result.chapter.qtnTests,
			},
			// questions: {
			// 	id: result.questions.id,
			// }
		};
	}

	private preserveGetTest(
		item: TestModel & {
			questions: QuestionModel[];
			organization: {
				id: number;
				name: string;
			};
		},
	): GetTestDTO {
		return {
			id: item.id,
			title: item.title,
			description: item.description,
			chapter: {
				id: item.chapterId,
				chapterTitle: item.chapterTitle,
			},
			testCreator: {
				id: item.creatorId,
				creatorName: item.creatorName,
			},
			dateOfCreate: item.dateOfCreate,
			qtnOfQuestion: item.qtnOfQuestion,
			qtnUsers: item.qtnUsers,
			readyToUse: item.readyToUse,
			organization: {
				id: item.organization.id,
				organizationTitle: item.organization.name,
			},
			questions: item.questions,
		};
	}
}
