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
  Put,
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
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get all users',
  })
  @ApiOkResponse({
    description: 'Users successfully received',
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get user by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'user id',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'User received',
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

  @Put(':id')
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
    description: 'user updated',
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
