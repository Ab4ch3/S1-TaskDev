import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JoinToProjectDto } from './dto/join-to-project.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('join-to-project')
  public async joinToProject(@Body() JoinToProjectDto: JoinToProjectDto) {
    return await this.usersService.joinToProject(JoinToProjectDto);
  }

  @Get()
  public async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
