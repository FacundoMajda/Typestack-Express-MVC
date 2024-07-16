import { IsInt, Min, Max, IsOptional, IsString } from "class-validator";

export class PaginationDTO {
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number = 10;

  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsString()
  @IsOptional()
  sortOrder?: "ASC" | "DESC" = "ASC";
}
