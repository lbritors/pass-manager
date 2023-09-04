import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCardDto {
  @IsString()
  owner: string;
  
  
  @IsString()
  @IsNotEmpty()
  number: string;
  
  @IsString()
  cv: string

  @IsBoolean()
  virtual: boolean;
  
  @IsString()
  password: string;
  
  
  @IsString()
  type: string;

}
