import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type UserInfo = 'id' | 'uid' | 'username';

type RequestUser = {
  id: number;
  username: string;
};

export const User = createParamDecorator(
  (key: UserInfo, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as RequestUser;
    return user && key ? user[key] : user;
  },
);
