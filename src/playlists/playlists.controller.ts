import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { PlaylistsService } from './playlists.service'
import { CreatePlaylistDto } from './dto/create-playlist.dto'
import { UpdatePlaylistDto } from './dto/update-playlist.dto'

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto)
  }

  @Get()
  findAll() {
    return this.playlistsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto
  ) {
    return this.playlistsService.update(id, updatePlaylistDto)
  }

  @Post(':id/music/:musicId')
  addMusic(@Param('id') id: string, @Param('musicId') musicId: string) {
    return this.playlistsService.addMusic(id, musicId)
  }

  @Delete()
  remove(@Body() { ids }: { ids: string[] }) {
    return this.playlistsService.remove(ids)
  }

  @Delete(':id')
  removeMusics(@Param('id') id: string, @Body() { ids }: { ids: string[] }) {
    return this.playlistsService.removeMusics(id, ids)
  }
}
