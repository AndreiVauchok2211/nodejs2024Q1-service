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
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({
    summary: 'create new album',
  })
  @ApiBody({
    type: CreateAlbumDto,
    description: 'Data for new album',
  })
  @ApiCreatedResponse({
    description: 'Album successfully created',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get all albums',
  })
  @ApiOkResponse({
    description: 'Albums getted',
    type: [Album],
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get single album by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id album',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Album getted',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Album id is not UUID',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album not found`);
    }
    return album;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update album info',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of album',
    type: 'string',
  })
  @ApiBody({
    type: UpdateAlbumDto,
    description: 'Data update album',
  })
  @ApiOkResponse({
    description: 'Album updated',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Album id is not UUID',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.update(id, updateAlbumDto);
    if (!album) {
      throw new NotFoundException(`Album not found`);
    }
    return album;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete album',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of album',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Album deleted',
  })
  @ApiBadRequestResponse({
    description: 'Album id is not UUID',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.remove(id);
  }
}
