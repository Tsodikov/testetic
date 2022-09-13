import { Roles } from '@prisma/client';
import { Contains, IsBoolean, IsEmail, isNumber, IsNumber, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString({ message: 'Не указан пароль' })
	password: string;

	@IsString({ message: 'Не указано имя' })
	name: string;

	@IsString({ message: 'Не указано имя' })
	firstName: string;

	@IsString({ message: 'Не указано имя' })
	lastName: string;

	@IsBoolean({ message: 'No Boolean' })
	active: boolean;

	@IsString({ message: 'Не указано имя' })
	role: Roles;

	// @IsString({ message: 'Не указано имя' })
	avatarId?: number | null | undefined;

	// @IsNumber({ message: 'Не указано имя' })
	departmentId: number;
}
