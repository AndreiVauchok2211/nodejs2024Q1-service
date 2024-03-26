import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { DataServices } from 'db/db';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule, AlbumModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService, DataServices],
})
export class AppModule {}
