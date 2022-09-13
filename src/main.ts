import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ExeptionFilter } from './errors/exeption.filters';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { IUserController } from './users/users.controller.interface';
import 'reflect-metadata';
import { UsersService } from './users/users.service';
import { IUsersService } from './users/users.service.interface';
import { IConfigService } from './config/config.service.iinterface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';
import { IChaptersController } from './chapters/chapters.controller.interface';
import { ChaptersController } from './chapters/chapters.controller';
import { ChaptersService } from './chapters/chapters.service';
import { IChaptersService } from './chapters/chapters.service.interface';
import { IChaptersRepository } from './chapters/chapters.repository.interface';
import { ChaptersRepository } from './chapters/chapters.repository';
import { ITestsController } from './tests.folder/tests.controller.interface';
import { TestsController } from './tests.folder/tests.controller';
import { ITestsService } from './tests.folder/tests.service.interface';
import { TestsService } from './tests.folder/tests.service';
import { ITestsRepository } from './tests.folder/tests.repository.interface';
import { TestsRepository } from './tests.folder/tests.repository';
import { QuestionsController } from './questions/questions.controller';
import { IQuestionsController } from './questions/questions.controller.interfce';
import { QuestionsRepository } from './questions/questions.repository';
import { IQuestionsRepository } from './questions/questions.repository.interface';
import { QuestionsService } from './questions/questions.service';
import { IQuestionsService } from './questions/questions.service.interface';
import { AnswersController } from './answers/answers.controller';
import { IAnswersController } from './answers/answers.controller.interfce';
import { AnswersRepository } from './answers/answers.repository';
import { IAnswersRepository } from './answers/answers.repository.interface';
import { AnswersService } from './answers/answers.service';
import { IAnswersService } from './answers/answers.service.interface';
import { IMediaFilesController } from './mediaFiles/mediaFiles.controller.interfce';
import { IMediaFilesService } from './mediaFiles/mediaFiles.service.interface';
import { IMediaFilesRepository } from './mediaFiles/mediaFiles.repository.interface';
import { MediaFilesController } from './mediaFiles/mediaFiles.controller';
import { MediaFilesService } from './mediaFiles/mediaFiles.service';
import { MediaFilesRepository } from './mediaFiles/mediaFiles.repository';
import { OrganizationController } from './organizations/organizations.controller';
import { IOrganizationController } from './organizations/organizations.controller.interface';
import { OrganizationRepository } from './organizations/organizations.repository';
import { IOrganizationRepository } from './organizations/organizations.repository.interface';
import { IOrganizationService } from './organizations/organizations.service.interface';
import { OrganizationService } from './organizations/orgnization.service';
import { TestSessionController } from './testSession/testSession.controller';
import { ITestSessionController } from './testSession/testSession.controller.interface';
import { TestSessionRepository } from './testSession/testSession.repository';
import { ITestSessionRepository } from './testSession/testSession.repository.interface';
import { TestSessionService } from './testSession/testSession.service';
import { ITestSessionService } from './testSession/testSession.service.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUsersService>(TYPES.UsersService).to(UsersService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

export const appBindingsChapters = new ContainerModule((bind: interfaces.Bind) => {
	bind<IChaptersController>(TYPES.ChaptersController).to(ChaptersController);
	bind<IChaptersService>(TYPES.ChaptersService).to(ChaptersService);
	bind<IChaptersRepository>(TYPES.ChaptersRepository).to(ChaptersRepository);
});

export const appBindingsTests = new ContainerModule((bind: interfaces.Bind) => {
	bind<ITestsController>(TYPES.TestsController).to(TestsController);
	bind<ITestsService>(TYPES.TestsService).to(TestsService);
	bind<ITestsRepository>(TYPES.TestsRepository).to(TestsRepository);
});

export const appBindingsQuestions = new ContainerModule((bind: interfaces.Bind) => {
	bind<IQuestionsController>(TYPES.QuestionsController).to(QuestionsController);
	bind<IQuestionsService>(TYPES.QuestionsService).to(QuestionsService);
	bind<IQuestionsRepository>(TYPES.QuestionsRepository).to(QuestionsRepository);
});

export const appBindingsAnswers = new ContainerModule((bind: interfaces.Bind) => {
	bind<IAnswersController>(TYPES.AnswersController).to(AnswersController);
	bind<IAnswersService>(TYPES.AnswersService).to(AnswersService);
	bind<IAnswersRepository>(TYPES.AnswersRepository).to(AnswersRepository);
});

export const appBindingsMedia = new ContainerModule((bind: interfaces.Bind) => {
	bind<IMediaFilesController>(TYPES.MediaFilesController).to(MediaFilesController);
	bind<IMediaFilesService>(TYPES.MediaFilesService).to(MediaFilesService);
	bind<IMediaFilesRepository>(TYPES.MediaFilesRepository).to(MediaFilesRepository);
});

export const appBindingsOrganization = new ContainerModule((bind: interfaces.Bind) => {
	bind<IOrganizationController>(TYPES.OrganizationController).to(OrganizationController);
	bind<IOrganizationService>(TYPES.OrganizationService).to(OrganizationService);
	bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(OrganizationRepository);
});

export const appBindingsTestSession = new ContainerModule((bind: interfaces.Bind) => {
	bind<ITestSessionController>(TYPES.TestSessionController).to(TestSessionController);
	bind<ITestSessionService>(TYPES.TestSessionService).to(TestSessionService);
	bind<ITestSessionRepository>(TYPES.TestSessionRepository).to(TestSessionRepository);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(
		appBindings,
		appBindingsChapters,
		appBindingsTests,
		appBindingsQuestions,
		appBindingsAnswers,
		appBindingsMedia,
		appBindingsOrganization,
		appBindingsTestSession,
	);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
}

export const boot = bootstrap();
