export interface ITestSession {
	testModelId: number;
	userModelId: number;
	registrationDateTime: Date;
	confirmationRegister: Date;
	invitationSended: Date;
	confirmationInvite: Date;
	startTest: Date;
	endTest: Date;
	status: string;
}
