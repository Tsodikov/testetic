import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import 'reflect-metadata';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.iinterface';
import { IUserController } from './users/users.controller.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { UserController } from './users/users.controller';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';
import cors from 'cors';
import { ChaptersController } from './chapters/chapters.controller';
import { TestsController } from './tests.folder/tests.controller';
import { QuestionsController } from './questions/questions.controller';
import { AnswersController } from './answers/answers.controller';
import { ParamsMiddleware } from './common/validate.params.midleware';
import { MediaFilesController } from './mediaFiles/mediaFiles.controller';
import { OrganizationController } from './organizations/organizations.controller';
import { TestSessionController } from './testSession/testSession.controller';

@injectable()
export class App {
	[x: string]: any;
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ChaptersController) private chaptersController: ChaptersController,
		@inject(TYPES.TestsController) private testsController: TestsController,
		@inject(TYPES.QuestionsController) private questionsController: QuestionsController,
		@inject(TYPES.AnswersController) private answersController: AnswersController,
		@inject(TYPES.MediaFilesController) private mediaFilesController: MediaFilesController,
		@inject(TYPES.OrganizationController) private organizationController: OrganizationController,
		@inject(TYPES.TestSessionController) private testSessionController: TestSessionController,
	) {
		this.app = express();
		this.port = Number(process.env.PORT) || 8000;
	}

	useMiddleware(): void {
		this.app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		// const paramsMiddleware = new ParamsMiddleware();
		// this.app.use(paramsMiddleware.execute.bind(paramsMiddleware));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/chapters', this.chaptersController.router);
		this.app.use('/tests', this.testsController.router);
		this.app.use('/questions', this.questionsController.router);
		this.app.use('/answers', this.answersController.router);
		this.app.use('/media', this.mediaFilesController.router);
		this.app.use('/org', this.organizationController.router);
		this.app.use('/testsession', this.testSessionController.router);
	}

	useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	// useCors(): void {
	// 	this.app.use(cors({ origin: ['http://localhost:3000'] }));
	// }

	public async init(): Promise<void> {
		// this.useCors();
		// this.app.use(cors({ origin: ['http://localhost:3000'] }));
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilter();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
