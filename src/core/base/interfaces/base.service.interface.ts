import { DeleteResult, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { BasePaginationDto } from '../dto/base.pagination.dto';
import { Pagination } from '../pagination';

export interface IBaseService<T> {
  create(entity: any): Promise<number>;

  findAllByPagination(
    options: BasePaginationDto,
    queryBuilder: SelectQueryBuilder<T>,
  ): Promise<Pagination<T>>;

  findOne(id: number): Promise<T | undefined>;

  findOneOrFail(id: number): Promise<T>;

  findMany(ids: number[]): Promise<T[]>;

  delete(id: number): Promise<DeleteResult>;

  restore(id: number): Promise<UpdateResult>;

  softDelete(id: number): Promise<UpdateResult>;

  update(id: number, entity: T): Promise<T>;
}
