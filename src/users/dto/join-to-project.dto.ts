import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ACCESS_LEVEL } from 'src/common/accessLevel';

export class JoinToProjectDto {
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @IsNotEmpty()
  @IsUUID()
  project: string;

  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accessLevel: ACCESS_LEVEL;
}
