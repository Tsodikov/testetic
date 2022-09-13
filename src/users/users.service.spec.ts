// import 'reflect-metadata';
// import { UserModel } from '@prisma/client';
// import { Container } from 'inversify';
// import { IConfigService } from '../config/config.service.iinterface';
// import { TYPES } from '../types';
// import { User } from './user.entity';
// import { IUsersRepository } from './users.repository.interface';
// import { UsersService } from './users.service';
// import { IUsersService } from './users.service.interface';

// const ConfigServiceMock: IConfigService = {
// 	get: jest.fn(),
// };

// const UsersRepositoryMock: IUsersRepository = {
// 	find: jest.fn(),
// 	findById: jest.fn(),
// 	create: jest.fn(),
// 	findAllUsers: jest.fn(),
// };

// const container = new Container();
// let configService: IConfigService;
// let usersRepository: IUsersRepository;
// let usersService: IUsersService;

// beforeAll(() => {
// 	container.bind<IUsersService>(TYPES.UsersService).to(UsersService);
// 	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
// 	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

// 	configService = container.get<IConfigService>(TYPES.ConfigService);
// 	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
// 	usersService = container.get<IUsersService>(TYPES.UsersService);
// });

// let createdUser: UserModel | null;

// describe('User Service', () => {
// 	it('createUser', async () => {
// 		configService.get = jest.fn().mockReturnValueOnce('1');
// 		usersRepository.create = jest.fn().mockImplementationOnce(
// 			(user: User): UserModel => ({
// 				name: user.name,
// 				email: user.email,
// 				firstName: user.firstName,
// 				lastName: user.lastName,
// 				active: user.active,
// 				password: user.password,
// 				id: 1,
// 				testModelId: [],
// 				organizationModelId: user.organizationModelId,
// 				role: user.role,
// 			}),
// 		);
// 		createdUser = await usersService.createUser({
// 			email: 'tsodikov@gmail.com',
// 			firstName: 'Leonid',
// 			lastName: 'Tsodikov',
// 			name: 'Leonid Tsodikov',
// 			active: true,
// 			role: 'ADMIN',
// 			organizationModelId: 1,
// 			password: '1',
// 		});

// 		expect(createdUser?.id).toEqual(1);
// 		expect(createdUser?.password).not.toEqual('1');
// 	});
// 	it('validateUser - success', async () => {
// 		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
// 		const result = await usersService.validateUser({
// 			email: 'tsodikov@gmail.com',
// 			password: '1',
// 		});
// 		expect(result).toBeTruthy();
// 	});
// 	it('validateUser - wrong password', async () => {
// 		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
// 		const result = await usersService.validateUser({
// 			email: 'tsodikov@gmail.com',
// 			password: '2',
// 		});
// 		expect(result).toBeFalsy();
// 	});
// 	it('validateUser - not find', async () => {
// 		usersRepository.find = jest.fn().mockReturnValueOnce(null);
// 		const result = await usersService.validateUser({
// 			email: 'tsodiko@gmail.com',
// 			password: '2',
// 		});
// 		expect(result).toBeFalsy();
// 	});
// });
