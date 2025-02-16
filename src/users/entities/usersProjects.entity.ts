import { Column, Entity, ManyToOne } from 'typeorm';
import { ACCESS_LEVEL } from '../../common/accessLevel';
import { BaseEntity } from '../../common/base.entity';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { UsersEntity } from './user.entity';

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL })
  public accessLevel: ACCESS_LEVEL;

  @ManyToOne(() => UsersEntity, (user) => user.projectIncludes)
  user: UsersEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.usersIncludes)
  project: ProjectEntity;
}
