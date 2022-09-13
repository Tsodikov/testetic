export interface IMediaFile {
	url: string;
	filename: string;
	size: number;
	type: string;
	// lastModified: number;
	// lastModifiedDate: string;
	// webkitRelativePath: string;
	questionId?: number;
	testId?: number;
	userAvatarId?: number;
}

export interface IMediaFileToTest {
	url: string;
	filename: string;
	size: number;
	type: string;
	testId?: number;
}

export interface IMediaFileToQuestion {
	url: string;
	filename: string;
	size: number;
	type: string;
	questionId?: number;
}
