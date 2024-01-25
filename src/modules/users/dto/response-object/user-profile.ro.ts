import { User } from '../../entities/user.entity';

export class UserProfileRo {
  constructor(data: User) {
    this.id = data.id;
    this.username = data.username;
    this.name = data.name;
    this.lastLoginAt = data.lastLoginAt;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  id: number;
  username: string;
  name: string;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
