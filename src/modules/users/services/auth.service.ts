import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(
    user: User,
    inputPassword: string,
  ): Promise<{ token: string }> | null {
    const isMatched = await bcrypt.compare(inputPassword, user.password);
    if (!isMatched) return null;

    // needs to match the format in jwt.strategy
    const payload = {
      userId: user.id,
      username: user.username,
      name: user.name,
    };
    return { token: await this.jwtService.signAsync(payload) };
  }
}
