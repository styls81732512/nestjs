import { Controller, Get, Query } from '@nestjs/common';
import { AdminController } from 'src/core';
import { FindPolicyholderDto } from '../../dto/find-policyholder.dto';
import { PolicyholdersService } from '../../policyholders.service';

@Controller('admin/policyholders/policyholder')
export class PolicyholderAdminController extends AdminController {
  constructor(private readonly policyholdersService: PolicyholdersService) {
    super();
  }

  @Get()
  async findOne(@Query() dto: FindPolicyholderDto) {
    const entities = await this.policyholdersService.getPolicyholderRelation(
      dto.id,
    );

    return this.respondOk(entities);
  }
}
