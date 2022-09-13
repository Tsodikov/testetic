import { QuestionModel } from '@prisma/client';

export class OutputTestSessionDTO {
	id: number;
	testId: number;
	userId: number;
	registrationDateTime: Date;
	confirmationRegister: Date;
	invitationSended: Date;
	confirmationInvite: Date;
	startTest: Date;
	endTest: Date;
	status: string;
	// questions: QuestionModel;
}
