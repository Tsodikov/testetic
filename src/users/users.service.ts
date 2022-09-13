import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.iinterface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@injectable()
export class UsersService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: UsersRepository,
	) {}

	async createUser({
		email,
		firstName,
		lastName,
		name,
		active,
		role,
		avatarId,
		departmentId,
		password,
	}: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(
			email,
			firstName,
			lastName,
			name,
			active,
			role,
			avatarId,
			departmentId,
		);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		// c+onsole.log(existedUser);
		if (existedUser) return null;
		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const loggedUser = await this.usersRepository.find(email);
		if (!loggedUser) {
			return false;
		}
		const user = new User(
			loggedUser.email,
			loggedUser.firstName,
			loggedUser.lastName,
			loggedUser.name,
			loggedUser.active,
			loggedUser.role,
			loggedUser.avatarId,
			loggedUser.departmentId as number,
			loggedUser.password,
		);
		const res = user.comparePassword(password);
		return res;
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}

	async getUsers(orgId: number): Promise<UserModel[] | null> {
		return this.usersRepository.findUsers(orgId);
	}

	async connectUserToOrg(orgId: number, user: UserRegisterDto): Promise<UserModel | null> {
		const userIsExist = await this.validateUser(user);
		const newUser = new User(
			user.email,
			user.firstName,
			user.lastName,
			user.name,
			user.active,
			user.role,
			user.avatarId,
			user.departmentId,
			user.password,
		);
		if (!userIsExist) {
			const salt = this.configService.get('SALT');
			await newUser.setPassword(newUser.password, Number(salt));
			return await this.usersRepository.createAndConnectToOrg(newUser, orgId);
		}
		const orgRegisteredUser = await this.usersRepository.findOrgToUser(user.email);
		let createPossibile = true;
		if (orgRegisteredUser && orgRegisteredUser.length === 0) {
			await this.usersRepository.connectOrgToUser(newUser, orgId);
		} else if (orgRegisteredUser) {
			orgRegisteredUser.forEach(async (item) => {
				if (item.id === orgId) {
					createPossibile = false;
					return;
				}
			});
		}
		if (createPossibile) {
			return await this.usersRepository.connectOrgToUser(newUser, orgId);
		} else {
			return null;
		}
	}
}
