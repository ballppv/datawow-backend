import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users') // Route หลัก: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto); // เรียก service เพื่อสร้าง user
  }

  @Get()
  findAll() {
    return this.usersService.findAll(); // เรียก service เพื่อดึง users ทั้งหมด
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id); // ดึง user ตาม id
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto); // อัปเดต user
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id); // ลบ user
  }
}
