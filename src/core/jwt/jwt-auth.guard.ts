import { AuthGuard, AuthModuleOptions } from '@nestjs/passport';
import { ExecutionContext, Injectable, Optional } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ALLOW_ANONYMOUS_META_KEY } from './allow-anonymous.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Optional() protected readonly options: AuthModuleOptions,
    private reflector: Reflector,
  ) {
    super(options);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowAnonymous = this.reflector.getAllAndOverride(
      ALLOW_ANONYMOUS_META_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (allowAnonymous) return allowAnonymous;

    return super.canActivate(context);
  }
}
