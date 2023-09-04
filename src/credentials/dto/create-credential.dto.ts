import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCredentialDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsString()
  userLogin: string;
  
  @IsString()
  @IsUrl()
  url: string;

  @IsString()
  password: string;
}
