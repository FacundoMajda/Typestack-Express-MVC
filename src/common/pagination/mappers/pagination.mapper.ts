import { Service } from "typedi";
import { BaseSearchDto } from "../dtos/base-search.dto";
import { PaginatedDto } from "../dtos/paginated.dto";

@Service()
export class PaginationMapper {
  createPaginatedDto<T, V extends BaseSearchDto>(
    page: PaginatedDto<T>,
    request: V,
    dtos: T[]
  ): PaginatedDto<T> {
    const paginatedDto = new PaginatedDto<T>(dtos, page.metadata.count);
    const pageNumber = request.getPageNumber();
    const pageSize = request.getTake();
    paginatedDto.metadata.setPaginationData(pageNumber, pageSize);
    paginatedDto.metadata.sortBy = request.sortBy;
    return paginatedDto;
  }
}
