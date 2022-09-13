import { NextFunction, Request, Response } from 'express';
import { ChapterOutputDTO } from './dto/chapter.output.dto';

export interface IChaptersController {
	// setAll: (req: Request, res: Response, next: NextFunction) => void;
	getAll: (req: Request, res: Response, next: NextFunction) => void;
	addChapter: (req: Request, res: Response, next: NextFunction) => void;
	getChapter: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	delChapter: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	updateChapter: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
