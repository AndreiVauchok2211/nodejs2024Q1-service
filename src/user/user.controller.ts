import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    type: CreateUserDto,
    description: 'new user  data',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'get all users',
  })
  @ApiOkResponse({
    description: 'Users successfully received',
    type: [User],
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'user id',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'User successfully received',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User id not UUID',
  })
  @ApiNotFoundResponse({
    description: 'User with this id not found',
  })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update user password',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'user id',
    type: 'string',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'update user data',
  })
  @ApiOkResponse({
    description: 'user successfully updated',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User id not UUID',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Old password is wrong' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete user',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'user id',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'User deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'User id not UUID',
  })
  @ApiNotFoundResponse({
    description: 'user not found',
  })
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.remove(id);
  }
}
