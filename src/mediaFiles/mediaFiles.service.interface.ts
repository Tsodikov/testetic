import { MediaFileModel } from '@prisma/client';
import { MediaFileInputDTO } from './dto/mediaFile.input.dto';
import { MediaFileOutputDTO } from './dto/mediaFile.output.dto';

export interface IMediaFilesService {
	createMediaFile: (
		mediaFile: MediaFileInputDTO,
		questionId: number,
	) => Promise<MediaFileOutputDTO | undefined>;
	getMediaFiles: (questionId: number) => Promise<MediaFileOutputDTO[] | undefined>;
	deleteMedia: (id: number) => Promise<number>;
}
