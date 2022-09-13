export class MediaFileInputDTO {
	filename: string;
	size: number;
	type: string;
	url: string;
	questionId?: number;
}

export class MediaFileToTestInputDTO {
	filename: string;
	size: number;
	type: string;
	url: string;
	// testId: number;
}
