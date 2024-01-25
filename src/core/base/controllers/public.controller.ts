import { JwtAuthGuard } from 'src/core/jwt';
import { BaseController } from './base.controller';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
export class PublicController extends BaseController {}
