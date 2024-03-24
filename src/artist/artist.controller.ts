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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
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
import { Artist } from './entities/artist.entity';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({
    summary: 'create new artist',
  })
  @ApiBody({
    type: CreateArtistDto,
    description: 'new artist data',
  })
  @ApiCreatedResponse({
    description: 'Artist successfully created',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Body does not contain required',
  })
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get all artists',
  })
  @ApiOkResponse({
    description: 'Artists successfully received',
    type: [Artist],
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get single artist by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of artist',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Artist successfully received',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Artist id not UUID',
  })
  @ApiNotFoundResponse({
    description: 'Artist id not found',
  })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist not found`);
    }
    return artist;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'artist update',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'artist id',
    type: 'string',
  })
  @ApiBody({
    type: UpdateArtistDto,
    description: 'data for update',
  })
  @ApiOkResponse({
    description: 'Artist updatet',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Artist id not UUID',
  })
  @ApiNotFoundResponse({
    description: 'Atrist not found',
  })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.artistService.update(id, updateArtistDto);
    if (!artist) {
      throw new NotFoundException(`Artist not found`);
    }
    return artist;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete artist',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id artist',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Artist successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Artist id not UUID',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.remove(id);
  }
}
