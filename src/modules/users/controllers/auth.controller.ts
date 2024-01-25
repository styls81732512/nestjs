import { Body, Controller, Post, Res } from '@nestjs/common';
import { ErrorCode, PublicController } from 'src/core';
import { AllowAnonymous } from 'src/core/jwt';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UsersService } from '../services/users.service';
import { Response } from 'express';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('public/auth/auth')
export class AuthController extends PublicController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  @Post('register')
  @AllowAnonymous()
  async register(@Body() dto: RegisterUserDto, @Res() response: Response) {
    const user = await this.usersService.findOneByUserName(dto.username);
    if (user) {
      return this.respondError(
        `${user.username} already exists`,
        ErrorCode.GLOBAL_VALIDATE_PIPE,
        response.status(400),
      );
    }

    const regexpUserName = dto.username.replace(
      new RegExp(/([a-zA-Z0-9])/g),
      '',
    );
    if (regexpUserName.length > 0) {
      return this.respondError(
        `帳號只能輸入英數字`,
        ErrorCode.GLOBAL_VALIDATE_PIPE,
        response.status(400),
      );
    }

    const userId = await this.usersService.createUser(dto);

    return this.respondCreated(userId, response);
  }

  @Post('login')
  @AllowAnonymous()
  async login(@Body() dto: LoginUserDto, @Res() response: Response) {
    const user = await this.usersService.findOneByUserName(dto.username);
    if (!user) {
      return this.respondError(
        'No such user: ' + dto.username,
        ErrorCode.NOT_EXIST,
        response.status(400),
      );
    }

    const result = await this.authService.login(user, dto.password);
    if (!result) {
      return this.respondError(
        'UNAUTHORIZED',
        ErrorCode.UNAUTHORIZED,
        response.status(401),
      );
    }
    await this.usersService.updateLastLoginTime(user.id);
    await this.usersService.updateToken(user.id, result.token);

    return this.respondOk(result, response);
  }
}
