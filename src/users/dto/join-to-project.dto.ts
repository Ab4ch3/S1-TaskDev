import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ACCESS_LEVEL } from 'src/common/accessLevel';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { UsersEntity } from '../entities/user.entity';

export class JoinToProjectDto {
  @IsNotEmpty()
  @IsUUID()
  user: UsersEntity;

  @IsNotEmpty()
  @IsUUID()
  project: ProjectEntity;

  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accessLevel: ACCESS_LEVEL;
}
