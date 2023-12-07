import { IBasePagination } from './interfaces/base.pagination.interface';

export class Pagination<T> {
  public total: number;
  public current: number;
  public limit: number;
  public data: T[];

  constructor(paginationResults: IBasePagination<T>) {
    this.total = paginationResults.total;
    this.current = paginationResults.current;
    this.limit = paginationResults.limit;
    this.data = paginationResults.data;
  }
}
