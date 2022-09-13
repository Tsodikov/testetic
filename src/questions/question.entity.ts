import { IQuestion } from './question.entity.interface';

export class Question {
	question: IQuestion;
	constructor(
		private readonly _questionText: string,
		private readonly _testId: number,
		private readonly _weight: number,
		private readonly _oneAnswer: boolean,
		private readonly _answerType: string,
		private readonly _explanationText: string,
	) {
		this.question = {
			questionText: this._questionText,
			testId: this._testId,
			weight: this._weight,
			oneAnswer: this._oneAnswer,
			answerType: this._answerType,
			explanationText: this._explanationText,
		};
	}
}
