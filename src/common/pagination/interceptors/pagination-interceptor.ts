import { Action, Interceptor, InterceptorInterface } from "routing-controllers";
import { Service } from "typedi";
import { PageMetadataDto } from "../dtos/page-metadata.dto";
import { PaginatedDto } from "../dtos/paginated.dto";

@Interceptor()
@Service()
export class PaginationInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    if (content && Array.isArray(content.data) && content.meta) {
      const metadata = new PageMetadataDto(content.data.length);
      metadata.setPaginationData(
        content.meta.pageNumber,
        content.meta.pageSize
      );
      metadata.sortBy = content.meta.sortBy;

      const paginatedResponse: PaginatedDto<any> = {
        data: content.data,
        metadata: metadata,
      };
      return paginatedResponse;
    }
    return content;
  }
}
