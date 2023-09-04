import { IsNotEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';
import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}