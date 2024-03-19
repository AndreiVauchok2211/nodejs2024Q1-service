import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataServices, users } from 'db/db';
import { createID } from 'src/services/createID';
import { userWithoutPassword } from 'src/services/userWithoutPassw';

@Injectable()
export class UserService {
  constructor(private readonly DBServices: DataServices) {}

  private Users: User[] = this.DBServices.users;

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: createID(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.Users.push(newUser);
    return userWithoutPassword(newUser);
  }

  findAll() {
    const allUsers = this.Users.map((user) => {
      return userWithoutPassword(user);
    });
    return allUsers;
  }

  findOne(id: string) {
    const user = this.Users.find((user) => user.id === id);
    if (user) {
      return userWithoutPassword(user);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.Users.find((user) => user.id === id);
    if (user) {
      if (user.password !== updateUserDto.oldPassword) {
        throw new ForbiddenException(
          `Incorrectly entered old password for user`,
        );
      }
      user.password = updateUserDto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
      return userWithoutPassword(user);
    }
    return user;
  }

  remove(id: string) {
    const userIndex = this.Users.findIndex((user) => user.id === id);
    if (userIndex == -1) {
      throw new NotFoundException({
        message: `User not found`,
      });
    }
    this.Users.splice(userIndex, 1);
  }
}
