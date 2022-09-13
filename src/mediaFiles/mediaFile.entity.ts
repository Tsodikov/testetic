import { IMediaFile, IMediaFileToQuestion, IMediaFileToTest } from './mediaFile.entity.interface';

export class MediaFile {
	mediaFile: IMediaFile;
	constructor(
		private readonly _filename: string,
		private readonly _size: number,
		private readonly _type: string,
		// private readonly _lastModified: number,
		// private readonly _lastModifiedDate: string,
		// private readonly _webkitRelativePath: string,
		private readonly _url: string,
		private readonly _questionId?: number,
		private readonly _testId?: number,
		private readonly _userAvatarId?: number,
	) {
		this.mediaFile = {
			url: this._url,
			filename: this._filename,
			size: this._size,
			type: this._type,
			// lastModified: this._lastModified,
			// lastModifiedDate: this._lastModifiedDate,
			// webkitRelativePath: this._webkitRelativePath,
			questionId: this._questionId,
			testId: this._testId,
			userAvatarId: this._userAvatarId,
		};
	}
}

export class MediaFileToTest {
	mediaFile: IMediaFileToTest;
	constructor(
		private readonly _filename: string,
		private readonly _size: number,
		private readonly _type: string,
		private readonly _url: string,
		private readonly _testId?: number,
	) {
		this.mediaFile = {
			url: this._url,
			filename: this._filename,
			size: this._size,
			type: this._type,
			testId: this._testId,
		};
	}
}

export class MediaFileToQuestion {
	mediaFile: IMediaFileToQuestion;
	constructor(
		private readonly _filename: string,
		private readonly _size: number,
		private readonly _type: string,
		private readonly _url: string,
		private readonly _questionId: number,
	) {
		this.mediaFile = {
			url: this._url,
			filename: this._filename,
			size: this._size,
			type: this._type,
			questionId: this._questionId,
		};
	}
}
