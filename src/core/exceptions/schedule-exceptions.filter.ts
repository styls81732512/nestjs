import { ExceptionFilter, Catch, Logger } from '@nestjs/common';

@Catch()
export class ScheduleExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ScheduleExceptionsFilter.name);
  catch(exception: Error): void {
    this.logger.error(exception.message, exception.stack);
  }
}
