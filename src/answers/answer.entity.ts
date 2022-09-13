import { IAnswer } from './answer.entity.interface';

export class Answer {
	answer: IAnswer;
	constructor(
		private readonly _textAnswer: string,
		private readonly _answerRight: boolean,
		private readonly _questionId: number,
	) {
		this.answer = {
			textAnswer: this._textAnswer,
			answerRight: this._answerRight,
			questionId: this._questionId,
		};
	}
}
