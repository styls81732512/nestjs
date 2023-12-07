export interface IBaseResponse<T> {
  code: string;

  message?: string;

  data?: T;
}
