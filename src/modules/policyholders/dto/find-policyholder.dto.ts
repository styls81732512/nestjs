import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindPolicyholderDto {
  @IsNotEmpty()
  @IsNumberString()
  public readonly id: number;
}
