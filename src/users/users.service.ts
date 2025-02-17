/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/common/error.manager';
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
      const users: UsersEntity[] = await this.userRepository.find();

      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro ningun resultado',
        });
      }
      return users;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/only-throw-error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findById(id: string): Promise<UsersEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro ningun usuario',
        });
      }

      return user;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/only-throw-error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async update(
    id: string,
    updateUserData: UpdateUserDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        id,
        updateUserData,
      );

      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar ningun resultado',
        });
      }

      return user;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/only-throw-error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async delete(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);

      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar ningun resultado',
        });
      }

      return user;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/only-throw-error
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
