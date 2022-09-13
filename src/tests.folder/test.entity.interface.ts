export interface ITest {
	title: string;
	description: string;
	dateOfCreate: Date;
	readyToUse: boolean;
	qtnOfQuestion: number;
	qtnUsers: number;
	creatorId: number;
	creatorName: string;
	timeLimitPassTest: boolean;
	timeLimit: number;
	preRegistration: boolean;
	startAnyTime: boolean;
	currentActiveStart: Date;
	currentActiveEnd: Date;
	backToAnyQuestion: boolean;
	showResultQuestion: boolean;
	showResultTest: boolean;
	organizationId: number;
	departmentId: number;
	chapterId: number;
	chapterTitle: string;
}
