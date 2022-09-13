import { DepartmentModel, OrganizationModel } from '@prisma/client';
import { DepartmentInputDTO } from './dto/department.input.dto';
import { IOrganization } from './organizations.entity.interface';

export interface IOrganizationRepository {
	create: (org: IOrganization) => Promise<OrganizationModel>;
	createDep: (org: DepartmentInputDTO) => Promise<DepartmentModel>;
	getById: (id: number) => Promise<OrganizationModel | null>;
	getDepById: (id: number) => Promise<DepartmentModel | null>;
	findDepByOrg: (orgId: number) => Promise<DepartmentModel[] | null>;
	deleteDep: (id: number) => Promise<number>;
	updateDep: (id: number, dep: DepartmentInputDTO) => Promise<DepartmentModel>;
	// get: (id: number) => Promise<OrganizationModel[] | undefined>;
	// delete: (id: number) => Promise<number>;
}
