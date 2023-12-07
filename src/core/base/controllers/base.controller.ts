import { HttpStatus, StreamableFile } from '@nestjs/common';
import { BaseResponse } from '../base.response';
import { Response } from 'express';
import { ErrorCode } from 'src/core';
import { Readable } from 'stream';
export class BaseController {
  /**
   * For select
   */
  protected respondOk(data: any, response?: Response) {
    if (response) return response.status(200).send(this.respond(data, '00'));
    return this.respond(data, '00');
  }

  /**
   * For create
   */
  protected respondCreated(id: number | string, response?: Response) {
    if (response) return response.status(201).send(this.respond({ id }, '00'));
    return this.respond({ id }, '00');
  }

  /**
   * For download excel
   */
  protected respondDownloadExcel(
    excel: Readable,
    name: string,
    response: Response,
  ) {
    response.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="' + name + '.xlsx"',
    });
    return new StreamableFile(excel);
  }

  /**
   * For update or delete
   */
  protected respondNoContent(response?: Response) {
    if (response) return response.status(200).send(this.respond(null, '00'));
    return this.respond(null, '00');
  }

  protected respondUnauthorized(response: Response) {
    return this.respondError(
      'Unauthorized',
      ErrorCode.UNAUTHORIZED,
      response.status(HttpStatus.UNAUTHORIZED),
    );
  }

  protected respondError(message: string, code: string, response: Response) {
    return response.send({
      code,
      message,
    });
  }

  private respond(data: any, code: string) {
    return new BaseResponse(data, code);
  }
}
