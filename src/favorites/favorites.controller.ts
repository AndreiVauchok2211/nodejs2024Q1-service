import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Favorite } from './entities/favorite.entity';

@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'get all favorites',
  })
  @ApiOkResponse({
    description: 'Favorites getted',
    type: Favorite,
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'add track to the favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id track',
    type: 'string',
  })
  @ApiCreatedResponse({
    description: 'Track added',
  })
  @ApiBadRequestResponse({
    description: 'Track id is not UUID',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Track does not exist',
  })
  addTrackToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @ApiOperation({
    summary: 'delete track from favorites',
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
  @ApiNotFoundResponse({
    description: 'Track does not found',
  })
  @HttpCode(204)
  removeTrackFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeTrackToFavorites(id);
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'album add to the favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id album',
    type: 'string',
  })
  @ApiCreatedResponse({
    description: 'Album added',
  })
  @ApiBadRequestResponse({
    description: 'Album id is not UUID',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album does not exist',
  })
  addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @ApiOperation({
    summary: 'delete album from favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id album',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Album deleted',
  })
  @ApiBadRequestResponse({
    description: 'Album id is not UUID',
  })
  @ApiNotFoundResponse({
    description: 'Album does not found',
  })
  @HttpCode(204)
  removeAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'add artist to the favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id artist',
    type: 'string',
  })
  @ApiCreatedResponse({
    description: 'Artist added',
  })
  @ApiBadRequestResponse({
    description: 'Artist id is not UUID',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Artist does not exist',
  })
  addArtistToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @ApiOperation({
    summary: 'delete artist from favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id artist',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Artist deleted',
  })
  @ApiBadRequestResponse({
    description: 'Artist id is not UUID',
  })
  @ApiNotFoundResponse({
    description: 'Artist does not found',
  })
  @HttpCode(204)
  removeArtistFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }
}
