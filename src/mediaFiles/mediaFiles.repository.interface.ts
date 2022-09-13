import { MediaFileModel, Prisma } from '@prisma/client';
import { MediaFileToTestInputDTO } from './dto/mediaFile.input.dto';
import { MediaFileToTest } from './mediaFile.entity';
import { IMediaFile } from './mediaFile.entity.interface';

export interface IMediaFilesRepository {
	create: (mediaFile: IMediaFile) => Promise<MediaFileModel | undefined>;
	getByQuestion: (id: number) => Promise<MediaFileModel[] | undefined>;
	delete: (id: number) => Promise<number>;
	deleteAllFromTest: (testId: number) => Promise<Prisma.BatchPayload>;
	createToTest: (mediaFiles: MediaFileToTest[]) => Promise<Promise<void>>;
	getByTest: (testId: number) => Promise<MediaFileModel[] | undefined>;
}
