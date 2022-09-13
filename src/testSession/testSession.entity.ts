import { ITestSession } from './testSession.entity.interface';

export class TestSession {
	testSession: ITestSession;
	constructor(
		private readonly _testModelId: number,
		private readonly _userModelId: number,
		private readonly _registrationDateTime: Date,
		private readonly _confirmationRegister: Date,
		private readonly _invitationSended: Date,
		private readonly _confirmationInvite: Date,
		private readonly _startTest: Date,
		private readonly _endTest: Date,
		private readonly _status: string,
	) {
		this.testSession = {
			testModelId: this._testModelId,
			userModelId: this._userModelId,
			registrationDateTime: this._registrationDateTime,
			confirmationRegister: this._confirmationRegister,
			invitationSended: this._invitationSended,
			confirmationInvite: this._confirmationInvite,
			startTest: this._startTest,
			endTest: this._endTest,
			status: this._status,
		};
	}
}
