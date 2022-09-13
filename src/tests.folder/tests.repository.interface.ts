import {
	ChapterModel,
	DepartmentModel,
	MediaFileModel,
	QuestionModel,
	TestModel,
} from '@prisma/client';
import { CreateTestInputDTO } from './dto/createTest.input.dto';
import { ITest } from './test.entity.interface';

export interface ITestsRepository {
	create: (test: CreateTestInputDTO) => Promise<
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
	>;

	getByChapter: (id: number) => Promise<
		(TestModel & {
			organization: {
				id: number;
				name: string;
			};
		})[]
	>;

	findByOrgUser: (
		orgId: number,
		userId: number,
	) => Promise<
		| (TestModel & {
				questions: QuestionModel[];
				organization: {
					id: number;
					name: string;
				};
		  })[]
		| null
	>;
	findByOrg: (orgId: number) => Promise<
		| (TestModel & {
				testMediaFiles: MediaFileModel[];
				questions: QuestionModel[];
				chapter: ChapterModel;
				department: DepartmentModel;
				organization: {
					id: number;
					name: string;
				};
		  })[]
		| null
	>;
	getById: (id: number) => Promise<
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
	>;

	findByDep: (depId: number) => Promise<
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
	>;

	delete: (testId: number) => Promise<TestModel | null>;
	update: (
		id: number,
		test: ITest,
	) => Promise<
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
	>;
}
