import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorCode } from 'src/core';
import { TypeORMError } from 'typeorm';
import { ValidationException } from '../exceptions';
import { PermissionDenyException } from '../exceptions/permission-deny.exception';
import { ThirdPartyException } from '../exceptions/third-party.exception';

type ResponseBody = {
  code: string;
  message: string | object;
};

type ThirdPartyResponseBody = {
  code: string;
  message: string | object;
  seq?: string;
  error?: object;
};

type ExceptionResponse = {
  statusCode: number;
  message: any[];
  error: string;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const responseBody: ResponseBody = {
      code: '',
      message: exception.message,
    };

    /** 客製化錯誤，一律回傳 400 */
    if (exception instanceof ValidationException) {
      responseBody.code = exception.getResponse().code;
      responseBody.message = exception.getResponse().message;
      return httpAdapter.reply(
        ctx.getResponse(),
        responseBody,
        HttpStatus.BAD_REQUEST,
      );
    }

    /** 無權限錯誤，一律回傳 401 */
    if (exception instanceof UnauthorizedException) {
      responseBody.code = ErrorCode.UNAUTHORIZED;
      return httpAdapter.reply(
        ctx.getResponse(),
        responseBody,
        HttpStatus.UNAUTHORIZED,
      );
    }

    /** 權限不足，一律回傳 403 */
    if (exception instanceof PermissionDenyException) {
      responseBody.code = ErrorCode.GLOBAL_PERMISSION_DENIED;
      responseBody.message = exception.message;
      return httpAdapter.reply(
        ctx.getResponse(),
        responseBody,
        HttpStatus.FORBIDDEN,
      );
    }

    /** 與集成串接錯誤，一律回傳 400 */
    if (exception instanceof ThirdPartyException) {
      const responseBody: ThirdPartyResponseBody = {
        code: exception.getResponse().code,
        message: exception.getResponse().message,
        seq: exception.getResponse().seq,
        error: exception.getResponse().error,
      };
      return httpAdapter.reply(
        ctx.getResponse(),
        responseBody,
        HttpStatus.BAD_REQUEST,
      );
    }

    // console.log(exception);

    if (exception instanceof TypeORMError) {
      responseBody.code = ErrorCode.GLOBAL_TYPE_ORM;
    }

    if (exception instanceof BadRequestException) {
      responseBody.code = ErrorCode.GLOBAL_VALIDATE_PIPE;

      const response = exception.getResponse() as ExceptionResponse;
      responseBody.message = response.message;
    }

    if (exception instanceof NotFoundException) {
      responseBody.code = ErrorCode.GLOBAL_HTTP_REQUEST;
      return httpAdapter.reply(
        ctx.getResponse(),
        responseBody,
        HttpStatus.NOT_FOUND,
      );
    }

    // For logging purposes
    // timestamp: new Date().toISOString(),
    // path: httpAdapter.getRequestUrl(ctx.getRequest()),

    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
