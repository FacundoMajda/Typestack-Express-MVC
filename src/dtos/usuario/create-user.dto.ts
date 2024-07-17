import { IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  name: string;
  @IsString()
  password: string;
}
