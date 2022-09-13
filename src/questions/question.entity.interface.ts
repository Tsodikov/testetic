export interface IQuestion {
	questionText: string;
	explanationText: string;
	testId: number;
	weight: number;
	oneAnswer: boolean;
	answerType: string;
}
