import { IsBoolean, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  owner: string;
  
  
  @IsString()
  @IsNotEmpty()
  number: string;
  
  @IsPositive()
  cv: number

  @IsString()
  expiration: string;

  @IsBoolean()
  virtual: boolean;
  
  @IsString()
  password: string;
  
  
  @IsString()
  type: string;

}
