export class BaseResponse {
  public code: string;
  public data: any;

  constructor(data: any, code: string) {
    this.code = code;
    this.data = data;
  }
}
