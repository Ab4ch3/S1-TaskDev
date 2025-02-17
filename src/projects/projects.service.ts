/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      return await this.projectRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOne(id: number): Promise<ProjectEntity | null> {
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        updateProjectDto,
      );

      if (project.affected === 0) {
        return undefined;
      }

      return project;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async delete(id: number): Promise<DeleteResult | undefined> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);

      if (project.affected === 0) {
        return undefined;
      }

      return project;
    } catch (error) {
      throw new Error(error);
    }
  }
}
