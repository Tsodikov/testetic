import { TestModel } from '@prisma/client';
import { CreateTestInputDTO } from './dto/createTest.input.dto';
import { GetTestDTO } from './dto/getTestDTO';
import { TestCreateOutputDTO } from './dto/testCreateOutputDTO';
import { TestInputDTO } from './dto/testInputDTO';
import { TestOutputDTO } from './dto/testOutputDTO';

export interface ITestsService {
	createTest: (test: CreateTestInputDTO) => Promise<TestCreateOutputDTO | null>;
	getTests: (chapterId: number) => Promise<TestOutputDTO[] | undefined>;
	getTestById: (testId: number) => Promise<TestOutputDTO | null>;
	getTestsByOrgUser: (orgId: number, userId: number) => Promise<TestOutputDTO[] | undefined>;
	getTestsByOrg: (orgId: number) => Promise<TestOutputDTO[] | undefined>;
	getTestsByDep: (depId: number) => Promise<TestOutputDTO[] | undefined>;
	deleteTest: (testId: number) => Promise<TestModel | null>;
	// updateTest: (id: number, data: CreateTestInputDTO) => Promise<TestCreateOutputDTO | undefined>;
}
