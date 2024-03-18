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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
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
import { Track } from './entities/track.entity';

@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({
    summary: 'create new track',
  })
  @ApiBody({
    type: CreateTrackDto,
    description: 'Data new track',
  })
  @ApiCreatedResponse({
    description: 'Track created',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get all tracks',
  })
  @ApiOkResponse({
    description: 'Tracks getted',
    type: [Track],
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get track by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id track',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Track getted',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Track id is not UUID',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track not found`);
    }
    return track;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update track',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id track',
    type: 'string',
  })
  @ApiBody({
    type: UpdateTrackDto,
    description: 'Data update album',
  })
  @ApiOkResponse({
    description: 'Track updated',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Track id is not UUID',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = this.trackService.update(id, updateTrackDto);
    if (!track) {
      throw new NotFoundException(`Track not found`);
    }
    return track;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete track',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id track',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Track deleted',
  })
  @ApiBadRequestResponse({
    description: 'Track id is not UUID',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.remove(id);
  }
}
