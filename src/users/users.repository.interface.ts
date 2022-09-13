import { MediaFileModel, OrganizationModel, UserModel } from '@prisma/client';
import { IOrganization } from '../organizations/organizations.entity.interface';
import { User } from './user.entity';

export interface IUsersRepository {
	create: (user: User) => Promise<UserModel>;
	createAndConnectToOrg: (userData: User, orgId: number) => Promise<UserModel>;
	connectOrgToUser: (user: User, orgId: number) => Promise<UserModel>;
	find: (email: string) => Promise<
		| (UserModel & {
				avatar: MediaFileModel | null;
				Organization: OrganizationModel[];
		  })
		| null
	>;
	findById: (id: number) => Promise<UserModel | null>;
	findUsers: (orgId: number) => Promise<UserModel[] | null>;
	findOrgToUser: (email: string) => Promise<OrganizationModel[] | null>;
}
