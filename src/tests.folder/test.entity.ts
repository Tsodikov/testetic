import { ITest } from './test.entity.interface';

export class Test {
	test: ITest;
	constructor(
		private readonly _title: string,
		private readonly _description: string,
		private readonly _dateOfCreate: Date,
		private readonly _readyToUse: boolean,
		private readonly _qtnOfQuestion: number,
		private readonly _qtnUsers: number,
		private readonly _creatorId: number,
		private readonly _creatorName: string,
		private readonly _timeLimitPassTest: boolean,
		private readonly _timeLimit: number,
		private readonly _preRegistration: boolean,
		private readonly _startAnyTime: boolean,
		private readonly _currentActiveStart: Date,
		private readonly _currentActiveEnd: Date,
		private readonly _backToAnyQuestion: boolean,
		private readonly _showResultQuestion: boolean,
		private readonly _showResultTest: boolean,
		private readonly _chapterId: number,
		private readonly _organizationId: number,
		private readonly _departmentId: number,
		private readonly _chapterTitle: string,
	) {
		this.test = {
			title: this._title,
			description: this._description,
			dateOfCreate: this._dateOfCreate,
			readyToUse: this._readyToUse,
			qtnOfQuestion: this._qtnOfQuestion,
			qtnUsers: this._qtnUsers,
			creatorId: this._creatorId,
			creatorName: this._creatorName,
			timeLimitPassTest: this._timeLimitPassTest,
			timeLimit: this._timeLimit,
			preRegistration: this._preRegistration,
			startAnyTime: this._startAnyTime,
			currentActiveStart: this._currentActiveStart,
			currentActiveEnd: this._currentActiveEnd,
			backToAnyQuestion: this._backToAnyQuestion,
			showResultQuestion: this._showResultQuestion,
			showResultTest: this._showResultTest,
			organizationId: this._organizationId,
			departmentId: this._departmentId,
			chapterId: this._chapterId,
			chapterTitle: this._chapterTitle,
		};
	}
}
