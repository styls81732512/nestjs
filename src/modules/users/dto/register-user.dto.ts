import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;
}
