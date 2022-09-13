import { InputQuestionSessionDTO } from './dto/inputQuestionSession.dto';
import { InputTestSessionDTO } from './dto/inputTestSession.dto';
import { OutputQuestionSessionDTO } from './dto/outputQuestionSession.dto';
import { OutputTestSessionDTO } from './dto/outputTestSession.dto';
import { OutputTestSessionTestDTO } from './dto/outputTestSessionTest.dto';
import { OutputTestSessionUserDTO } from './dto/outputTestSessionUser.dto';

export interface ITestSessionService {
	createTestSession: (testSession: InputTestSessionDTO) => Promise<OutputTestSessionTestDTO>;
	getByUserTestId: (userId: number, testId: number) => Promise<OutputTestSessionDTO | null>;
	getByTestId: (testId: number) => Promise<OutputTestSessionUserDTO[] | null>;
	getByUserId: (testId: number, status: string) => Promise<OutputTestSessionTestDTO[] | null>;
	updateTestSession: (
		id: number,
		body: InputTestSessionDTO,
	) => Promise<OutputTestSessionTestDTO | null>;
	createQuestionSession: (
		questionSession: InputQuestionSessionDTO,
	) => Promise<OutputQuestionSessionDTO>;
	updateQuestionSession: (
		id: number,
		questionSession: InputQuestionSessionDTO,
	) => Promise<OutputQuestionSessionDTO | null>;
	getQSbyTSId: (userId: number) => Promise<OutputQuestionSessionDTO[] | null>;
}
