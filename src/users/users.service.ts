/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async create(CreateDataUser: CreateUserDto): Promise<UsersEntity> {
    try {
      return await this.userRepository.save(CreateDataUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findAll(): Promise<UsersEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findById(id: number): Promise<UsersEntity | null> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(
    id: number,
    updateUserData: UpdateUserDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        id,
        updateUserData,
      );

      if (user.affected === 0) {
        return undefined;
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async delete(id: number): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);

      if (user.affected === 0) {
        return undefined;
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
