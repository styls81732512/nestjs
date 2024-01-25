import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx_username')
  @Column({
    type: 'varchar',
    length: 12,
    nullable: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  token: string;

  @Column({
    type: 'boolean',
    comment: '狀態',
    default: true,
  })
  enabled: boolean;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '上次登入時間',
  })
  lastLoginAt: Date;

  @Index('idx_createdAt')
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '註冊時間',
  })
  createdAt: Date;

  @Index('idx_updatedAt')
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '更新時間',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    comment: '刪除時間',
    default: null,
  })
  deletedAt: Date;
}
