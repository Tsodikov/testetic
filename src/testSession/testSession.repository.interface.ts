import {
	AnswerModel,
	MediaFileModel,
	QuestionModel,
	QuestionSessionModel,
	TestModel,
	TestSessionModel,
	UserModel,
} from '@prisma/client';
import { InputQuestionSessionDTO } from './dto/inputQuestionSession.dto';
import { InputTestSessionDTO } from './dto/inputTestSession.dto';

export interface ITestSessionRepository {
	create: (testSession: InputTestSessionDTO) => Promise<
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
	>;
	findByUserTestId: (userId: number, testId: number) => Promise<TestSessionModel | null>;
	findByTestId: (testId: number) => Promise<
		| (TestSessionModel & {
				user: UserModel;
		  })[]
		| null
	>;
	findByUserId: (
		userId: number,
		status: string,
	) => Promise<
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
	>;
	update: (
		id: number,
		testSession: InputTestSessionDTO,
	) => Promise<
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
	>;

	createQuestionSession: (questionSession: InputQuestionSessionDTO) => Promise<
		QuestionSessionModel & {
			testSession: TestSessionModel;
			question: QuestionModel;
			choiceAnswers: AnswerModel[];
		}
	>;
	updateQuestionSession(
		id: number,
		questionSession: InputQuestionSessionDTO,
	): Promise<
		QuestionSessionModel & {
			testSession: TestSessionModel;
			question: QuestionModel;
			choiceAnswers: AnswerModel[];
		}
	>;
}
