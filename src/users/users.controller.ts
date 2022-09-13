import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUsersService } from './users.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import 'reflect-metadata';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.iinterface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UsersService) private userService: IUsersService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middleware: [new ValidateMiddleware(UserRegisterDto)],
			},

			{
				path: '/connectuser/:orgId',
				method: 'post',
				func: this.connectUserToOrg,
				middleware: [new ValidateMiddleware(UserRegisterDto)],
			},

			{
				path: '/login',
				method: 'post',
				func: this.login,
				middleware: [new ValidateMiddleware(UserLoginDto)],
			},

			{
				path: '/info',
				method: 'get',
				func: this.info,
				middleware: [new AuthGuard()],
			},
			{
				path: '/getusersorg/:orgId',
				method: 'get',
				func: this.getUsersToOrg,
				// middleware: [],
			},
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		// res.set('Access-Control-Allow-Origin', '*');
		// console.log(res.getHeaders());
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, 'Ошибка авторизации', 'login'));
		}
		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
		const userData = await this.userService.getUserInfo(req.body.email);
		this.ok(res, { jwt, userData });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	async connectUserToOrg(
		{ params, body }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.connectUserToOrg(Number(params.orgId), body);
		if (!result) {
			return next(new HTTPError(422, 'This user already exists in your organization'));
			this.err(res, 'This user already exists in your organization');
		}
		this.ok(res, {
			id: result.id,
			email: result.email,
			name: result.name,
			firstName: result.firstName,
			lastName: result.lastName,
			avatarId: result.avatarId,
			active: result.active,
			role: result.role,
			departmentId: result.departmentId,
		});
	}

	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.userService.getUserInfo(req.user);
		this.ok(res, {
			email: userInfo?.email,
			id: userInfo?.id,
			name: userInfo?.name,
		});
		this.loggerService.log(`${userInfo?.name} sending`);
	}

	async getUsersToOrg(req: Request, res: Response, next: NextFunction): Promise<void> {
		const users = await this.userService.getUsers(Number(req.params.orgId));
		if (!users) {
			this.ok(res, []);
		}
		this.ok(res, users);
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
