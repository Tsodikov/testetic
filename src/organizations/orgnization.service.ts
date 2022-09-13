import { injectable, inject } from 'inversify';
import { ChaptersRepository } from '../chapters/chapters.repository';
import { ILogger } from '../logger/logger.interface';
import { TestOutputDTO } from '../tests.folder/dto/testOutputDTO';
import { TYPES } from '../types';
import { DepartmentInputDTO } from './dto/department.input.dto';
import { DepartmentOutputDTO } from './dto/department.output.dto';
import { GetAllOrgDTO } from './dto/GetAllOrgDTO';
import { OrganizationInputDto } from './dto/organizations.input.dto';
import { OrganizationOutputDto } from './dto/organizations.output.dto';
import { Organization } from './organizations.enttity';
import { OrganizationRepository } from './organizations.repository';
import { IOrganizationService } from './organizations.service.interface';

@injectable()
export class OrganizationService implements IOrganizationService {
	constructor(
		@inject(TYPES.OrganizationRepository) private organizationRepository: OrganizationRepository,
		@inject(TYPES.ChaptersRepository) private chaptersRepository: ChaptersRepository,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {}

	async createOrganization(organization: OrganizationInputDto): Promise<OrganizationOutputDto> {
		const org = new Organization(
			organization.name,
			organization.category,
			organization.description,
			organization.country,
			organization.state,
			organization.city,
			organization.website,
			organization.phone,
			organization.adress,
			organization.zip,
			organization.logo,
			organization.backgroundImage,
			organization.terms,
		);
		const result = await this.organizationRepository.create(org.organization);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[OrganizationService] error creating organization: ${err.message}`);
		}
		return result;
	}

	async addDepartment(department: DepartmentInputDTO): Promise<DepartmentOutputDTO> {
		// const org = new Organization(
		// 	organization.name,
		// 	organization.category,
		// 	organization.description,
		// 	organization.country,
		// 	organization.state,
		// 	organization.city,
		// 	organization.website,
		// 	organization.phone,
		// 	organization.adress,
		// 	organization.zip,
		// 	organization.logo,
		// 	organization.backgroundImage,
		// 	organization.terms,
		// );
		const result = await this.organizationRepository.createDep(department);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[OrganizationService] error creating department: ${err.message}`);
		}
		return {
			...result,
			qtnTests: result.qtnTests ? result.qtnTests : 0,
		};
	}

	async getAllOrg(): Promise<GetAllOrgDTO[] | null> {
		const result = await this.organizationRepository.findAllOrg();
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[OrganizationService]: Not found chapter: ${err.message}`);
			return null;
		}
		return result;
	}

	async getOrgByChapterId(chapterId: number): Promise<OrganizationOutputDto | undefined> {
		if (chapterId) {
			const orgId = await this.chaptersRepository.findOrg(chapterId);

			if (!orgId) {
				const err = new Error();
				this.loggerService.error(`[OrganizationService]: Not found chapter: ${err.message}`);
				return undefined;
			}
			const result = await this.organizationRepository.getById(orgId);
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[OrganizationService]: Not found organization: ${err.message}`);
				return undefined;
			}
			return {
				id: result.id,
				name: result.name,
				category: result.category,
				description: result.description,
				country: result.country,
				state: result.state,
				city: result.city,
				website: result.website,
				phone: result.phone,
				adress: result.adress,
				zip: result.zip,
				logo: result.logo,
				backgroundImage: result.backgroundImage,
				terms: result.terms,
			};
		} else {
			return undefined;
		}
	}

	async getDepByOrgId(orgId: number): Promise<DepartmentOutputDTO[] | undefined> {
		if (orgId) {
			const result = await this.organizationRepository.findDepByOrg(orgId);

			if (!result) {
				const err = new Error();
				this.loggerService.error(`[OrganizationService]: Not found chapter: ${err.message}`);
				return undefined;
			}
			return result.map((dep) => ({
				id: dep.id,
				name: dep.name,
				qtnTests: dep.qtnTests ? dep.qtnTests : 0,
				organizationId: dep.organizationId,
			}));
		} else {
			return undefined;
		}
	}

	async deleteDepartment(id: number): Promise<number> {
		const result = await this.organizationRepository.deleteDep(id);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[QuestionsService]: Error getQuestions: ${err.message}`);
		}
		return result;
	}
}
