import { Action, Interceptor, InterceptorInterface } from "routing-controllers";
import { Service } from "typedi";
import { PaginatedResponse } from "../interfaces/paginated-response";

@Interceptor()
@Service()
export class PaginationInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    if (content && Array.isArray(content.data) && content.meta) {
      const paginatedResponse: PaginatedResponse<any> = {
        data: content.data,
        meta: {
          currentPage: content.meta.currentPage,
          itemsPerPage: content.meta.itemsPerPage,
          totalItems: content.meta.totalItems,
          totalPages: content.meta.totalPages,
          sortBy: content.meta.sortBy,
          sortOrder: content.meta.sortOrder,
        },
      };
      return paginatedResponse;
    }
    return content;
  }
}
