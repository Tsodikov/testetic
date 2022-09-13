import { Roles } from '@prisma/client';
import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(
		private readonly _email: string,
		private readonly _firstName: string,
		private readonly _lastName: string,
		private readonly _name: string,
		private readonly _active: boolean,
		private readonly _role: Roles,
		private readonly _avatarId: number | null | undefined,
		private readonly _departmentId: number | null,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get firstName(): string {
		return this._firstName;
	}

	get lastName(): string {
		return this._lastName;
	}

	get active(): boolean {
		return this._active;
	}

	get role(): Roles {
		return this._role;
	}

	get avatarId(): number | null | undefined {
		return this._avatarId;
	}

	get departmentId(): number | undefined {
		if (!this._departmentId) {
			return undefined;
		}
		return this._departmentId;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		const res = await compare(pass, this._password);
		return res;
	}
}
