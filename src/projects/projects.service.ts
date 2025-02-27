/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/common/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  public async create(
    createDataProject: CreateProjectDto,
  ): Promise<ProjectEntity> {
    try {
      return await this.projectRepository.save(createDataProject);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findAll(): Promise<ProjectEntity[]> {
    try {
      const projects: ProjectEntity[] = await this.projectRepository.find();

      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro ningun resultado',
        });
      }

      return projects;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error, @typescript-eslint/no-unsafe-member-access
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOne(id: string): Promise<ProjectEntity | null> {
    try {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
        .getOne();

      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro ningun projecto',
        });
      }

      return project;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error, @typescript-eslint/no-unsafe-member-access
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        updateProjectDto,
      );

      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar ningun resultado',
        });
      }

      return project;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/only-throw-error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async delete(id: string): Promise<DeleteResult | undefined> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);

      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar ningun resultado',
        });
      }

      return project;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/only-throw-error
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
