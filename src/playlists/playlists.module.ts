import { Module } from '@nestjs/common'
import { PlaylistsService } from './playlists.service'
import { PlaylistsController } from './playlists.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Playlist, PlaylistsSchema } from './schemas/playlist.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistsSchema }
    ])
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService]
})
export class PlaylistsModule {}
