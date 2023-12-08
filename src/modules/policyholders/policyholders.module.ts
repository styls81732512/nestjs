import { Module } from '@nestjs/common';
import { Policyholder } from './entities/policyholder.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicyholderAdminController } from './controllers/admin/policyholder-admin.controller';
import { PolicyholdersService } from './policyholders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Policyholder])],
  controllers: [PolicyholderAdminController],
  providers: [PolicyholdersService],
})
export class PolicyholdersModule {}
