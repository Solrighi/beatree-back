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
import {
  CreatePlaylistDto,
  CreatePlaylistSchema
} from './dto/create-playlist.dto'
import {
  UpdatePlaylistDto,
  UpdatePlaylistSchema
} from './dto/update-playlist.dto'
import { ZodValidationPipe } from 'src/zod/ZodValidationPipe'

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreatePlaylistSchema))
    createPlaylistDto: CreatePlaylistDto
  ) {
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
    @Body(new ZodValidationPipe(UpdatePlaylistSchema))
    updatePlaylistDto: UpdatePlaylistDto
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
