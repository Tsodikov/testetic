import { QuestionModel, Roles } from '@prisma/client';

export class OutputTestSessionUserDTO {
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
	user: {
		id: number;
		email: string;
		firstName: string;
		lastName: string;
		name: string;
		active: boolean;
		role: Roles;
	};
	// questions: QuestionModel;
}
