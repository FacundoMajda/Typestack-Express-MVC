import { Expose } from "class-transformer";

export class PageMetadataDto {
  @Expose()
  count: number;

  @Expose()
  pageSize: number;

  @Expose()
  pageNumber: number;

  @Expose()
  totalPages: number;

  @Expose()
  sortBy: string;

  constructor(count: number) {
    this.count = count;
  }

  setPaginationData(pageNumber: number, pageSize: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(this.count / this.pageSize);
  }
}
