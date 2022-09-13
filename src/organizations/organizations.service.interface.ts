import { TestOutputDTO } from '../tests.folder/dto/testOutputDTO';
import { DepartmentInputDTO } from './dto/department.input.dto';
import { DepartmentOutputDTO } from './dto/department.output.dto';
import { OrganizationInputDto } from './dto/organizations.input.dto';
import { OrganizationOutputDto } from './dto/organizations.output.dto';

export interface IOrganizationService {
	createOrganization: (organization: OrganizationInputDto) => Promise<OrganizationOutputDto>;
	addDepartment: (department: DepartmentInputDTO) => Promise<DepartmentOutputDTO>;
	getOrgByChapterId: (chapterId: number) => Promise<OrganizationOutputDto | undefined>;
	getDepByOrgId: (orgId: number) => Promise<DepartmentOutputDTO[] | undefined>;
	deleteDepartment: (id: number) => Promise<number>;
	// getTestOrg: (userId: number) => Promise<TestOutputDTO | undefined>;
	// getInfo: (userId: number) => Promise<OrganizationOutputDto[] | undefined>;
	// deleteOrganization: (id: number) => Promise<number>;
}
