import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataServices } from 'db/db';

@Module({
  controllers: [UserController],
  providers: [UserService, DataServices],
})
export class UserModule {}
