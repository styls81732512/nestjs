import { ErrorCode, PublicController } from 'src/core';
import { UsersService } from '../services/users.service';
import { Controller, Get, Res } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { Response } from 'express';
import { UserProfileRo } from '../dto/response-object/user-profile.ro';

@Controller('public/users/user')
export class UserController extends PublicController {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Get('profile')
  async getUserProfile(@User('id') userId: number, @Res() response: Response) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      return this.respondError(
        `No such user`,
        ErrorCode.NOT_EXIST,
        response.status(401),
      );
    }

    return this.respondOk(new UserProfileRo(user), response);
  }
}
