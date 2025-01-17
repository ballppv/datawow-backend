import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import Entity User สำหรับใช้กับ TypeORM
  controllers: [UsersController], // เชื่อม UsersController
  providers: [UsersService], // เชื่อม UsersService
  exports: [UsersService], // ให้โมดูลอื่นสามารถใช้ UsersService ได้
})
export class UsersModule {}
