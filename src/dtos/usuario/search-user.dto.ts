import { IsOptional } from "class-validator";
import { BaseSearchDto } from "../../common/pagination/dtos/base-search.dto";

export class SearchUsuarioDto extends BaseSearchDto {
  @IsOptional()
  id?: number;
  @IsOptional()
  name?: string;
}
