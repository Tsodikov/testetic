import { DepartmentModel, OrganizationModel } from '@prisma/client';
import { injectable, inject } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { DepartmentInputDTO } from './dto/department.input.dto';
import { IOrganization } from './organizations.entity.interface';
import { Organization } from './organizations.enttity';
import { IOrganizationRepository } from './organizations.repository.interface';

@injectable()
export class OrganizationRepository implements IOrganizationRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async create(org: IOrganization): Promise<OrganizationModel> {
		try {
			const result = await this.prismaService.client.organizationModel.create({
				data: {
					name: org.name,
					category: org.category,
					description: org.description,
					country: org.country,
					state: org.state,
					city: org.city,
					website: org.website,
					phone: org.phone,
					adress: org.adress,
					zip: org.zip,
					logo: org.logo,
					backgroundImage: org.backgroundImage,
					terms: org.terms,
				},
				include: { specialUsers: true },
			});
			if (!result) {
				const err = new Error();
				this.loggerService.error(
					`[OrganizationRepository] error writing to datqabase: ${err.message}`,
				);
			}
			return result;
		} catch (err: any) {
			this.loggerService.error(
				`[OrganizationRepository] error writing to datqabase: ${err.message}`,
			);
			return err;
		}
	}

	async createDep(dep: DepartmentInputDTO): Promise<DepartmentModel> {
		const result = await this.prismaService.client.departmentModel.create({
			data: {
				name: dep.name,
				qtnTests: dep.qtnTests,
				organizationId: dep.organizationId,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[OrganizationRepository] error writing to datqabase: ${err.message}`,
			);
		}
		return result;
	}

	async updateDep(id: number, dep: DepartmentInputDTO): Promise<DepartmentModel> {
		const result = await this.prismaService.client.departmentModel.update({
			where: { id },
			data: {
				name: dep.name,
				qtnTests: dep.qtnTests,
				organizationId: dep.organizationId,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(
				`[OrganizationRepository] error writing to datqabase: ${err.message}`,
			);
		}
		return result;
	}

	async getById(id: number): Promise<OrganizationModel | null> {
		try {
			if (id) {
				return this.prismaService.client.organizationModel.findFirst({
					where: {
						id,
					},
				});
			} else {
				return null;
			}
		} catch (err: any) {
			this.loggerService.error(`Error reading database: ${err.message}`);
			return null;
		}
	}

	async getDepById(id: number): Promise<DepartmentModel | null> {
		try {
			if (id) {
				return this.prismaService.client.departmentModel.findFirst({
					where: {
						id,
					},
				});
			} else {
				return null;
			}
		} catch (err: any) {
			this.loggerService.error(`Error reading database: ${err.message}`);
			return null;
		}
	}

	async findAllOrg(): Promise<{ id: number; name: string }[] | null> {
		try {
			const result = await this.prismaService.client.organizationModel.findMany({
				select: {
					id: true,
					name: true,
				},
			});
			if (!result) {
				const err = new Error();
				this.loggerService.error(`Error reading database: ${err.message}`);
				return null;
			}
			return result;
		} catch (err: any) {
			this.loggerService.error(`Error reading database: ${err.message}`);
			return null;
		}
	}

	async findDepByOrg(orgId: number): Promise<DepartmentModel[] | null> {
		try {
			if (orgId) {
				const result = this.prismaService.client.departmentModel.findMany({
					where: {
						organizationId: orgId,
					},
				});
				return result;
			} else {
				return null;
			}
		} catch (err: any) {
			this.loggerService.error(`Error reading database: ${err.message}`);
			return null;
		}
	}

	async deleteDep(id: number): Promise<number> {
		const result = await this.prismaService.client.departmentModel.delete({
			where: {
				id: id,
			},
		});
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[QuestionsRepository]: Error deleting: ${err.message}`);
		}
		return result.id;
	}

	// async findTestsById(userId: number): Promise<OrganizationModel | null> {
	// 	try {
	// 		if (userId) {
	// 			return this.prismaService.client.organizationModel.findMany({
	// 				where: {
	// 					id,
	// 				},
	// 			});
	// 		} else {
	// 			return null;
	// 		}
	// 	} catch (err: any) {
	// 		this.loggerService.error(`Error reading database: ${err.message}`);
	// 		return null;
	// 	}
	// }
}
