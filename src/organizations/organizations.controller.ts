import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { DepartmentInputDTO } from './dto/department.input.dto';
import { OrganizationInputDto } from './dto/organizations.input.dto';
import { IOrganizationController } from './organizations.controller.interface';
import { OrganizationService } from './orgnization.service';

@injectable()
export class OrganizationController extends BaseController implements IOrganizationController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.OrganizationService) private organizationService: OrganizationService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/getbychapter/:chapterId', method: 'get', func: this.getByChapterId },
		]);
		this.bindRoutes([{ path: '/add', method: 'post', func: this.add }]);
		this.bindRoutes([{ path: '/adddep', method: 'post', func: this.addDep }]);
		this.bindRoutes([{ path: '/getdep/:orgId', method: 'get', func: this.getDepByOrg }]);
		this.bindRoutes([{ path: '/getall', method: 'get', func: this.getAllOrg }]);
		this.bindRoutes([{ path: '/deldep/:id', method: 'delete', func: this.delDep }]);
	}

	async add(
		{ body }: Request<{}, {}, OrganizationInputDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.organizationService.createOrganization(body);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[OrganizationController] Error adding organization ${err.message}`);
		}
		this.ok(res, result);
	}

	async addDep(
		{ body }: Request<{}, {}, DepartmentInputDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.organizationService.addDepartment(body);
		if (!result) {
			const err = new Error();
			this.loggerService.error(`[OrganizationController] Error adding department ${err.message}`);
		}
		this.ok(res, result);
	}

	async getAllOrg(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.organizationService.getAllOrg();
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[OrganizationController]: ${err.message}`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[OrganizationController]: Error transfer data: ${err.message}`);
		}
	}

	async getByChapterId({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.organizationService.getOrgByChapterId(Number(params.chapterId));
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[OrganizationController]: ${err.message}`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[OrganizationController]: Error transfer data: ${err.message}`);
		}
	}

	async getDepByOrg({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.organizationService.getDepByOrgId(Number(params.orgId));
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[OrganizationController]: ${err.message}`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[OrganizationController]: Error transfer data: ${err.message}`);
		}
	}

	async delDep({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.organizationService.deleteDepartment(Number(params.id));
			if (!result) {
				const err = new Error();
				this.loggerService.error(`[OrganizationController]: ${err.message}`);
			} else {
				this.ok(res, result);
			}
		} catch (err: any) {
			this.loggerService.error(`[OrganizationController]: Error transfer data: ${err.message}`);
		}
	}
}
