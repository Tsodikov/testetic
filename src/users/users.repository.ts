import { MediaFileModel, OrganizationModel, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { IOrganization } from '../organizations/organizations.entity.interface';
import { Organization } from '../organizations/organizations.enttity';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async create({
		email,
		firstName,
		lastName,
		active,
		role,
		name,
		avatarId,
		// departmentModelId,
		password,
	}: User): Promise<UserModel> {
		try {
			return this.prismaService.client.userModel.create({
				data: {
					email,
					firstName,
					lastName,
					name,
					active,
					avatarId,
					role,
					// departmentModelId,
					// Organization: {
					// 	connect: {
					// 		id: organizationId,
					// 	},
					// },
					password,
				},
			});
		} catch (err: any) {
			this.loggerService.error(`[UsersRepository]: ${err.message}`);
			return err;
		}
	}

	async createAndConnectToOrg(
		{ email, firstName, lastName, active, role, name, avatarId, departmentId, password }: User,
		orgId: number,
	): Promise<UserModel> {
		return await this.prismaService.client.userModel.create({
			data: {
				email,
				firstName,
				lastName,
				name,
				active,
				role,
				Organization: {
					connect: {
						id: orgId,
					},
				},
				avatarId,
				departmentId,
				password,
			},
		});
	}

	async connectOrgToUser(
		{ email, firstName, lastName, active, role, name, avatarId, departmentId, password }: User,
		orgId: number,
	): Promise<UserModel> {
		const result = await this.prismaService.client.userModel.update({
			where: { email },
			data: {
				email,
				firstName,
				lastName,
				name,
				active,
				role,
				Organization: {
					connect: {
						id: orgId,
					},
				},
				avatarId,
				departmentId,
				password,
			},
		});
		return result;
	}

	async find(email: string): Promise<
		| (UserModel & {
				avatar: MediaFileModel | null;
				Organization: OrganizationModel[];
		  })
		| null
	> {
		const users = await this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
			include: {
				Organization: true,
				avatar: true,
			},
		});
		return users;
	}

	async findOrgToUser(email: string): Promise<OrganizationModel[] | null> {
		const users = await this.prismaService.client.userModel.findFirst({
			where: {
				email: email,
			},
			include: {
				Organization: true,
			},
		});
		if (!users) {
			const err = new Error();
			this.loggerService.error(`[UsersRepository]: ${err.message}`);
			return null;
		}
		return users.Organization;
	}

	async findById(id: number): Promise<UserModel | null> {
		return await this.prismaService.client.userModel.findFirst({
			where: {
				id,
			},
		});
	}

	async findUsers(orgId: number): Promise<UserModel[] | null> {
		const users = await this.prismaService.client.organizationModel.findFirst({
			where: {
				id: orgId,
			},
			include: {
				specialUsers: true,
			},
		});
		if (!users) {
			const err = new Error();
			this.loggerService.error(`[UsersRepository]: ${err.message}`);
			return null;
		}
		return users.specialUsers;
	}
}
