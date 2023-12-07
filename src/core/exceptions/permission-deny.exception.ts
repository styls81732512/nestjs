import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionDenyException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
