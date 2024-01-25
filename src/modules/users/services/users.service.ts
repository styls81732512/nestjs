import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto/register-user.dto';
import * as bcrypt from 'bcryptjs';
import dayjs from 'dayjs';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  async findOneByUserName(username: string): Promise<User | null> {
    return await this.userRepo.findOne({
      where: {
        username: username,
      },
    });
  }

  async createUser(data: RegisterUserDto) {
    return this.create({
      username: data.username,
      password: await bcrypt.hash(data.password, 10),
      name: data.name,
    });
  }

  async updateLastLoginTime(id: number) {
    return this.userRepo.update(id, {
      lastLoginAt: dayjs().toDate(),
    });
  }

  async updateToken(id: number, token: string) {
    return this.userRepo.update(id, {
      token,
    });
  }
}
