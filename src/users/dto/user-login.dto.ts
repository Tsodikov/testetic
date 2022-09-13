import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Указан неверный email' })
	email: string;

	@IsString({ message: 'Неверный пароль' })
	password: string;
}
