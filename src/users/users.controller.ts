import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { ROLE } from 'src/auth/role.enum';

@ApiTags("Users")
@Controller({ path:'users', version: '1'})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get("/entire/:email")
  async findEntireUserByEmail(@Param('email') email: string): Promise<any> {
    return await this.usersService.findEntireUserByEmail(email)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
